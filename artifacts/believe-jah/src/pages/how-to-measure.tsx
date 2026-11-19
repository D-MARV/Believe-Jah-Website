import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';

const measurements = [
  ['Neck', 'Measure around the base of your neck, keeping the tape comfortably snug.'],
  ['Chest', 'Measure around the fullest part of your chest, with the tape level.'],
  ['Waist', 'Measure around your natural waist without pulling the tape tight.'],
  ['Hip', 'Measure around the fullest part of your seat.'],
  ['Sleeve', 'Measure from the shoulder point to your wrist.'],
  ['Garment length', 'Measure from the shoulder point to your preferred hem.'],
  ['Inseam', 'Measure from the crotch to your preferred trouser hem.'],
];

function downloadFittingGuide() {
  const copy = [
    'BELIEVE JAH DESIGN', 'HOW TO MEASURE', '',
    'Use a flexible tape and keep it level. Measure over light clothing without pulling tight.', '',
    '1. NECK - around the base of the neck.',
    '2. CHEST - around the fullest part of the chest.',
    '3. WAIST - around the natural waist.',
    '4. HIP - around the fullest part of the seat.',
    '5. SLEEVE - shoulder point to wrist.',
    '6. GARMENT LENGTH - shoulder point to preferred hem.',
    '7. INSEAM - crotch to preferred trouser hem.', '',
    'Record measurements in centimetres or inches.',
    'The atelier will confirm your measurements during fitting.',
    '', 'Tim Caro Street, opposite Welfare Hospital, Old Ife Road, Ibadan.',
    'WhatsApp / Phone: 09116025977',
  ];
  const escape = (line: string) => line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const stream = ['BT', '/F1 15 Tf', '52 748 Td', `(${escape(copy[0])}) Tj`, '/F1 11 Tf', '0 -28 Td', `(${escape(copy[1])}) Tj`, '/F1 10 Tf', ...copy.slice(2).flatMap((line) => ['0 -22 Td', `(${escape(line)}) Tj`]), 'ET'].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, '0')} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'believe-jah-fitting-guide.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

export default function HowToMeasure() {
  useEffect(() => {
    document.title = 'How to Measure — BELIEVE JAH Design';
  }, []);

  return (
    <main className="site-shell measure-page">
      <header className="measure-header">
        <a className="brand-lockup" href="/" aria-label="BELIEVE JAH Design home">
          <img src="/favicon.svg" alt="" />
          <span className="brand-word">BELIEVE JAH<span>Design</span></span>
        </a>
        <a className="text-link" href="/"><ArrowLeft size={14} /> Back to home</a>
      </header>
      <section className="measure-intro">
        <div className="eyebrow kicker-line">A fitting guide</div>
        <h1 className="display">How to<br /><em>measure.</em></h1>
        <p>Use a flexible tape over light clothing and keep it level. Measure comfortably, without pulling the tape tight. These notes are a starting point; your tailor will confirm the fit with you.</p>
        <div className="measure-actions">
          <button className="btn-primary" type="button" onClick={downloadFittingGuide}>Download fitting guide PDF <Download size={15} /></button>
          <a className="btn-outline" href="/#consultation">Start an inquiry <ArrowRight size={14} /></a>
        </div>
      </section>
      <section className="measure-list-section" aria-labelledby="measure-list-title">
        <div>
          <div className="eyebrow kicker-line">Seven key measurements</div>
          <h2 id="measure-list-title" className="display">A clear place<br />to start.</h2>
        </div>
        <ol className="measure-list">
          {measurements.map(([label, description], index) => (
            <li key={label}>
              <span className="measure-number">0{index + 1}</span>
              <div><h3>{label}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="measure-footer">
        BELIEVE JAH Design <span>·</span> Bespoke Nigerian menswear, Ibadan
      </footer>
    </main>
  );
}
