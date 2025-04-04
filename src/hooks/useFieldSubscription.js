import { useEffect, useMemo, useContext } from 'react';
import { useFormController } from './useFormController';
// import { useForceUpdate } from './useForceUpdate';
import { isChild } from '../utils';
import { Debug } from '../debug';
import { useScoper } from './useScoper';
import { ScopeContext } from '../Context';

const debug = Debug('informed:useFieldSubscription' + '\t');

/* ----------------------- useFieldSubscription ----------------------- */
export const useFieldSubscription = (
  event,
  fields = [],
  cb,
  scoped = true,
  flipped = false
) => {
  // Create scoper function
  const scope = useScoper();

  const scopedContext = useContext(ScopeContext);

  // Determine what fields is ( might be function )
  const check = typeof fields === 'function' ? [] : fields;

  const builtFields = useMemo(
    () => {
      if (typeof fields === 'function') {
        // Generate fields array with scope
        // Example: fields = scope => [`${scope}.foo`, `${scope}.bar`]
        return fields(scopedContext);
      }
      // Example relevanceWhen = ["name", "age"]
      return fields;
    },
    [...check, scope]
  );

  // Generate scoped fields
  const scopedFields = useMemo(
    () => {
      if (scoped && typeof fields != 'function') {
        return builtFields.map(field => scope(field));
      }
      return builtFields;
    },
    [builtFields]
  );

  // Grab the form controller
  const formController = useFormController();

  // Magic trick
  // const forceUpdate = useForceUpdate();

  // Register for events on our field
  useEffect(
    () => {
      const listener = (target, triggers) => {
        // Who triggered this event
        // Example trigger = "UnitedStates.Price"
        debug(`target: ${target}, triggers: ${triggers}`);

        // console.log('TARGET', target, 'FIELDS', scopedFields);
        // either
        // 1. All fields are supposed to update
        // 2. This is a specific registration "foo" === "foo"
        // 3. This field is a child of registration "friends[0].name" is a child of name="friends[0]"
        if (
          target === '_ALL_' ||
          scopedFields.includes(target) ||
          (target &&
            scopedFields.some(field => {
              if (flipped) {
                // isChild( parent, child )
                return isChild(target, field);
              } else {
                // isChild( parent, child )
                return isChild(field, target);
              }
            }))
        ) {
          debug(
            `subscription ${event} triggered with target ${target} from trigger ${triggers} for`,
            scopedFields
          );
          // forceUpdate();
          cb(target, triggers);
        }
      };

      formController.emitter.on(event, listener);
      if (scopedFields.length) {
        debug(
          `Adding subscription on event ${event}, subscribing to events from ${scopedFields}`
        );
      }

      // When name changes we always force an update!
      // forceUpdate();

      return () => {
        if (scopedFields.length) {
          debug(
            `Removing subscription on event ${event}, un-subscribing to events from ${scopedFields}`
          );
        }
        formController.emitter.removeListener(event, listener);
      };
    },
    [...check]
  );
};
