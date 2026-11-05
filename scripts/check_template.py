#!/usr/bin/env python3
"""Check the importable XML, standalone JS, and JSON-LD substitution branches."""
from pathlib import Path
import json
import subprocess
import tempfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
HTML = '{http://www.w3.org/1999/xhtml}'
DATA = '{http://www.google.com/2005/gml/data}'
B = '{http://www.google.com/2005/gml/b}'

def render(node, present):
    if node.tag.startswith(DATA):
        field = node.tag[len(DATA):]
        assert field.endswith('.jsonEscaped'), 'Unescaped JSON value: ' + field
        value = 'Title "quoted" \\ path\nRīga & <text>'
        if any(s in field.lower() for s in ['url', 'ofpage']):
            value = 'https://example.com/path?a=1&b=2'
        if 'ISO8601' in field:
            value = '2026-11-05T10:00:00+02:00'
        return json.dumps(value, ensure_ascii=False)[1:-1]
    active = True
    if node.tag == B + 'if':
        active = present
    output = (node.text or '') if active else ''
    for child in node:
        if child.tag == B + 'else':
            active = not active
        elif active:
            output += render(child, present)
        if active:
            output += child.tail or ''
    return output

def main():
    count = schemas = templated = 0
    with tempfile.TemporaryDirectory(prefix='blogger-check-') as scratch:
        for path in sorted(ROOT.glob('*.xml')):
            tree = ET.parse(path)
            print('XML OK:', path.name)
            if path.name != ROOT.name + '.xml':
                continue
            for name in ('post', 'mobile-post'):
                renderer = next(x for x in tree.iter(B + 'includable') if x.get('id') == name)
                assert len([x for x in renderer.iter(B + 'include') if x.get('name') == 'colorlib-post-schema']) == 1, name
            for index, element in enumerate(tree.iter(HTML + 'script')):
                if element.get('type') == 'application/ld+json':
                    for present in (True, False):
                        schema = json.loads(render(element, present))
                        assert schema['@context'] == 'https://schema.org'
                        if schema['@type'] == 'BlogPosting':
                            assert schema['headline'].startswith('Title "quoted"')
                            assert ('image' in schema) == present
                            assert ('dateModified' in schema) == present
                    schemas += 1
                    continue
                if element.get('src'):
                    continue
                if len(element):
                    templated += 1
                    continue
                js = Path(scratch) / f'{index}.js'
                js.write_text(''.join(element.itertext()))
                subprocess.run(['node', '--check', str(js)], check=True, capture_output=True)
                count += 1
    print(f'JS OK: {count} standalone blocks; JSON-LD OK: {schemas} blocks, optional fields present/absent.')
    print(f'{templated} Blogger-dependent scripts still require a test-blog smoke test.')

if __name__ == '__main__':
    main()
