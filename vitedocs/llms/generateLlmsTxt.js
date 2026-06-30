const DOCS_BASE_URL = 'https://teslamotors.github.io/informed';

export function generateLlmsTxt(docIndex) {
  const lines = [
    '# Informed',
    '',
    '> A lightweight framework and utility for building powerful forms in React applications.',
    '',
    'Documentation for humans: ' + DOCS_BASE_URL,
    '',
    '## Documentation (markdown)',
    ''
  ];

  const sections = {
    'getting-started': 'Getting Started',
    'api-reference': 'API Reference',
    examples: 'Examples'
  };

  for (const [prefix, label] of Object.entries(sections)) {
    const sectionEntries = docIndex.entries
      .filter(entry => entry.path.startsWith(prefix + '/'))
      .sort((a, b) => a.path.localeCompare(b.path));

    if (!sectionEntries.length) continue;

    lines.push(`### ${label}`);
    lines.push('');
    for (const entry of sectionEntries) {
      lines.push(
        `- [${entry.title}](${DOCS_BASE_URL}/${entry.path}.md): ${entry.path}`
      );
    }
    lines.push('');
  }

  const otherEntries = docIndex.entries
    .filter(
      entry =>
        !entry.path.startsWith('getting-started/') &&
        !entry.path.startsWith('api-reference/') &&
        !entry.path.startsWith('examples/')
    )
    .sort((a, b) => a.path.localeCompare(b.path));

  if (otherEntries.length) {
    lines.push('### Other');
    lines.push('');
    for (const entry of otherEntries) {
      lines.push(
        `- [${entry.title}](${DOCS_BASE_URL}/${entry.path}.md): ${entry.path}`
      );
    }
    lines.push('');
  }

  lines.push('## Usage');
  lines.push('');
  lines.push(
    'Append `.md` to any documentation URL to retrieve the raw markdown source, e.g.:'
  );
  lines.push('');
  lines.push(`${DOCS_BASE_URL}/getting-started/intro.md`);
  lines.push('');

  return lines.join('\n');
}
