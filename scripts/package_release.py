#!/usr/bin/env python3
"""Build a reproducible, public-files-only Blogger release and checksums."""
import argparse
import hashlib
from pathlib import Path
import re
import shutil
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

def main():
    root = Path(__file__).resolve().parents[1]
    theme = root / (root.name + '.xml')
    version = re.search(r'Version:\s*(\d+\.\d+\.\d+)', theme.read_text())[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, type=Path)
    output = parser.parse_args().output.resolve()
    if output == root or root in output.parents:
        parser.error('Write release files outside the source repository.')
    output.mkdir(parents=True, exist_ok=True)
    files = [theme, *(root / name for name in ['README.md','CHANGELOG.md','LICENSE','AGENTS.md','CONTRIBUTING.md'])]
    files += sorted(root.glob('*Demo Content.xml')) + sorted(root.glob('*.pdf'))
    if (root / 'readme.txt').exists():
        files.append(root / 'readme.txt')
    for folder, extension in [('docs','*.md'),('scripts','*.py'),('tests','*.cjs')]:
        files += sorted((root / folder).glob(extension))
    files.append(root / '.github/workflows/validate.yml')
    archive = output / (root.name.lower() + '.zip')
    with ZipFile(archive, 'w', compression=ZIP_DEFLATED, compresslevel=9) as bundle:
        for file in sorted(set(files)):
            entry = ZipInfo(root.name + '/' + file.relative_to(root).as_posix(), (2026,11,5,0,0,0))
            entry.compress_type = ZIP_DEFLATED
            entry.external_attr = 0o644 << 16
            bundle.writestr(entry, file.read_bytes())
    xml = output / theme.name
    shutil.copyfile(theme, xml)
    sums = ''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n' for p in [archive,xml])
    (output / 'SHA256SUMS').write_text(sums)
    print(f'{root.name} {version}: {len(set(files))} files; {archive.stat().st_size} byte ZIP')
    print(sums, end='')

if __name__ == '__main__':
    main()
