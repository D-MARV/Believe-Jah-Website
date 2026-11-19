import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CollectionCategory = {
  name: string;
  price: string;
  description: string;
  looks: { name: string; image: string }[];
};

const categories: CollectionCategory[] = [
  {
    name: 'Agbada',
    price: '₦60,000–₦90,000',
    description: 'Ceremonial volume with considered embroidery and finishing.',
    looks: [
      { name: 'The Teal Ceremony', image: 'Teal_Green_Agbada_1791518540559.jpg' },
      { name: 'The Oxblood Agbada', image: "Traditional_Men's_Outfit;_Agbada_1791518540560.jpg" },
      { name: 'The White Occasion', image: 'IMG-20261012-WA0000.jpg' },
      { name: 'The Draped Agbada', image: 'IMG-20261101-WA0002.jpg' },
    ],
  },
  {
    name: 'Kaftan',
    price: '₦45,000–₦70,000',
    description: 'A clean, versatile silhouette tailored for ease and occasion.',
    looks: [
      { name: 'The Green & Pink Edit', image: 'Believe_Jah_1_1791518540545.jpeg' },
      { name: 'White with Embroidered Pockets', image: 'IMG-20261114-WA0000.jpg' },
    ],
  },
  {
    name: 'Senator',
    price: '₦45,000–₦75,000',
    description: 'Quiet structure, balanced proportions and a precise finish.',
    looks: [
      { name: 'The Two-Tone Senator', image: 'Believe_Jah_2_1791518540546.jpeg' },
      { name: 'The Brown Senator', image: 'Believe_Jah_4_1791518540548.jpeg' },
      { name: 'Quiet Structure', image: 'Believe_Jah_5_1791518540549.jpeg' },
      { name: 'A Study in White', image: 'Believe_Jah_7_1791518540552.jpeg' },
      { name: 'White Senator Set', image: 'Believe_Jah_6_1791518540551.jpeg' },
      { name: 'The White Senator', image: 'Believe_Jah_13_1791518540558.jpeg' },
      { name: 'The Tailored Detail', image: 'IMG-20261014-WA0003.jpg' },
      { name: 'The Embroidered Senator', image: 'Believe_Jah_3_1791518540547.jpeg' },
      { name: 'Burgundy Senator', image: 'agbada-video.png' },
    ],
  },
  {
    name: 'Custom tees',
    price: '₦30,000–₦45,000',
    description: 'Personal graphics and details, made to your brief.',
    looks: [
      { name: 'The Neutral Tee Set', image: 'Believe_Jah_8_1791518540553.jpeg' },
      { name: 'The Embroidered Tee Set', image: 'Believe_Jah_11_1791518540556.jpeg' },
      { name: 'The Polo Set', image: 'Believe_jah_9_1791518540554.jpeg' },
      { name: 'The Everyday Set', image: 'Believe_Jah_10_1791518540555.jpeg' },
      { name: 'Made to Move', image: 'Believe_Jah_12_1791518540557.jpeg' },
    ],
  },
  {
    name: 'Wedding / special occasion',
    price: '₦45,000–₦90,000',
    description: 'Formal Agbada and Senator looks for weddings, ceremonies and milestone moments.',
    looks: [
      { name: 'The Teal Ceremony', image: 'Teal_Green_Agbada_1791518540559.jpg' },
      { name: 'The Oxblood Agbada', image: "Traditional_Men's_Outfit;_Agbada_1791518540560.jpg" },
      { name: 'The White Occasion', image: 'IMG-20261012-WA0000.jpg' },
      { name: 'Blue Aso-Oke Senator', image: 'IMG-20261106-WA0000.jpg' },
      { name: 'White Embroidered Set', image: 'IMG-20261112-WA0009.jpg' },
    ],
  },
];

type SelectedLook = CollectionCategory['looks'][number] & {
  category: CollectionCategory;
};

export default function Collections() {
  const [selectedLook, setSelectedLook] = useState<SelectedLook | null>(null);

  useEffect(() => {
    document.title = 'Collections — BELIEVE JAH Design';
  }, []);

  const inquiryUrl = selectedLook
    ? `https://wa.me/2349116025977?text=${encodeURIComponent(`Hello BELIEVE JAH Design, I am interested in "${selectedLook.name}" from the ${selectedLook.category.name} collection. Please share more details and confirm the final price.`)}`
    : '';

  return (
    <main className="site-shell collections-page">
      <header className="collections-page-header">
        <a className="brand-lockup" href="/" aria-label="BELIEVE JAH Design home">
          <img src="/favicon.svg" alt="" />
          <span className="brand-word">BELIEVE JAH<span>Design</span></span>
        </a>
        <a className="text-link" href="/"><ArrowLeft size={14} /> Back to home</a>
      </header>

      <section className="lookbook section-pad collections-catalog" aria-labelledby="collections-title">
        <div className="lookbook-head">
          <div>
            <div className="eyebrow kicker-line">Made in Ibadan · Made to order</div>
            <h1 id="collections-title" className="display">The collections</h1>
          </div>
          <p>Explore each look for its details and indicative price. Select a garment to ask the designer about that specific piece.</p>
        </div>

        {categories.map((category, categoryIndex) => (
          <section className="collection-group" key={category.name} aria-labelledby={`collection-${categoryIndex}`}>
            <div className="collection-group-heading">
              <div>
                <span className="look-cat">0{categoryIndex + 1} / Collection</span>
                <h2 id={`collection-${categoryIndex}`} className="display">{category.name}</h2>
              </div>
              <div className="collection-group-copy">
                <strong>{category.price}</strong>
                <p>{category.description}</p>
              </div>
            </div>
            <div className="lookbook-grid collections-grid">
              {category.looks.map((look, lookIndex) => (
                <button
                  type="button"
                  className="look-card collection-card"
                  key={look.image}
                  onClick={() => setSelectedLook({ ...look, category })}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${look.name}, ${category.name}`}
                >
                  <img src={`/brand/${look.image}`} alt="" loading="lazy" />
                  <span className="look-overlay">
                    <span className="look-cat">{category.name}</span>
                    <span className="collection-card-title">{look.name}</span>
                    <span className="collection-card-price">{category.price}</span>
                    <span className="collection-card-action">View details <ArrowUpRight size={13} /></span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
        <p className="collections-note">Prices are indicative and depend on fabric, embroidery, fit and finishing. The atelier confirms the final quote before an order is placed.</p>
      </section>

      <Dialog open={selectedLook !== null} onOpenChange={(open) => { if (!open) setSelectedLook(null); }}>
        {selectedLook && (
          <DialogContent className="collection-dialog">
            <div className="collection-dialog-image">
              <img src={`/brand/${selectedLook.image}`} alt={`${selectedLook.name}, ${selectedLook.category.name}`} />
            </div>
            <div className="collection-dialog-details">
              <span className="look-cat">{selectedLook.category.name}</span>
              <DialogHeader>
                <DialogTitle className="display collection-dialog-title">{selectedLook.name}</DialogTitle>
                <DialogDescription className="collection-dialog-description">{selectedLook.category.description}</DialogDescription>
              </DialogHeader>
              <div className="collection-dialog-price">
                <span className="eyebrow">Indicative price</span>
                <strong>{selectedLook.category.price}</strong>
              </div>
              <p className="collection-dialog-note">This look is made to order. Fabric, measurements and finishing can be discussed with the designer; the final price is confirmed before work begins.</p>
              <a className="btn-primary collection-inquiry" href={inquiryUrl} target="_blank" rel="noreferrer">
                Inquire about this look <ArrowUpRight size={15} />
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
