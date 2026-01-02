import csv
from pathlib import Path

p = Path(__file__).with_name('health_data.csv')
rows = []
with p.open('r', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        val = r.get('posture')
        try:
            iv = int(float(val))
        except Exception:
            iv = 0
        # map 0-100 posture into single digit 0-9
        digit = iv // 10
        if digit > 9:
            digit = 9
        r['posture_score'] = str(digit)
        # remove old column
        r.pop('posture', None)
        rows.append(r)

# write back with new header
fieldnames = ['sleep','activity','water','screen','mood','bmi','posture_score','obesity','cardio','hypertension']
with p.open('w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print('Transformed', p)
