/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subject, Section, Chapter, Topic, UserRole, UserStatus, AuthProvider, MembershipStatus, Theme } from "../types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "sub-ent",
    name: "Otorhinolaryngology (ENT)",
    slug: "otorhinolaryngology-ent",
    description: "Comprehensive medical and surgical training content for Ear, Nose, and Throat, fully optimized for NEXT/NEET-PG and USMLE preparation.",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600",
    topicsCount: 15,
    chaptersCount: 3
  }
];

export const MOCK_SECTIONS: Section[] = [
  { id: "sec-ear", subjectId: "sub-ent", name: "Section I: Otology (Ear)", order: 1 },
  { id: "sec-nose", subjectId: "sub-ent", name: "Section II: Rhinology (Nose & Sinuses)", order: 2 },
  { id: "sec-throat", subjectId: "sub-ent", name: "Section III: Laryngology & Head-Neck", order: 3 }
];

export const MOCK_CHAPTERS: Chapter[] = [
  {
    id: "chap-middle-ear",
    subjectId: "sub-ent",
    sectionId: "sec-ear",
    name: "Diseases of Middle Ear",
    description: "Detailed study of acute and chronic inflammatory and infectious states of the middle ear cleft, ossicular pathology, and clinical management.",
    order: 1
  },
  {
    id: "chap-nasal-septum",
    subjectId: "sub-ent",
    sectionId: "sec-nose",
    name: "Diseases of Nasal Septum",
    description: "Anatomical variances, pathologies, deviated septum, hematoma, septal perforation, and surgical corrective methods.",
    order: 2
  },
  {
    id: "chap-pharynx-larynx",
    subjectId: "sub-ent",
    sectionId: "sec-throat",
    name: "Laryngeal Airways & Procedures",
    description: "Acute airway obstruction, tracheostomy indications, techniques, post-operative care, complications, and decannulation.",
    order: 3
  }
];

export const MOCK_TOPICS: Topic[] = [
  {
    id: "topic-aom",
    subjectId: "sub-ent",
    sectionId: "sec-ear",
    chapterId: "chap-middle-ear",
    title: "Acute Otitis Media (AOM)",
    slug: "acute-otitis-media-aom",
    summary: "A comprehensive guide on etiology, staging, clinical features, otoscopic findings, and modern medical-surgical treatment of Acute Otitis Media.",
    isPremium: false, // Free to read online, download restricted to members
    pdfUrl: "/pdfs/acute-otitis-media-dr-pulkit.pdf",
    pdfSize: "2.4 MB",
    readingTime: 8,
    order: 1,
    status: "PUBLISHED",
    seoTitle: "Acute Otitis Media (AOM) - Causes, Stages & Treatment | Dr. Pulkit ENT",
    seoDescription: "Master the staging (Myringitis, Catarrhal, Suppurative, Resolution) and treatment guidelines of Acute Otitis Media. High-yield ENT medical notes.",
    tags: ["Otology", "Middle Ear", "Pediatric ENT", "High Yield"],
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-06-10T14:30:00Z",
    content: `
      <div class="space-y-6 text-slate-700">
        <p class="text-lg leading-relaxed">
          <strong>Acute Otitis Media (AOM)</strong> is defined as an acute, rapid onset of signs and symptoms of inflammatory disease of the middle ear cleft. The middle ear cleft comprises the Eustachian tube, middle ear cavity, attic, aditus, antrum, and mastoid air cells. It is particularly common in young children due to their shorter, wider, and more horizontal Eustachian tubes.
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md my-4">
          <h4 class="font-bold text-blue-900 flex items-center gap-2">
            <span class="text-lg">💡</span> High-Yield Pearl
          </h4>
          <p class="text-blue-800 text-sm mt-1">
            Streptococcus pneumoniae remains the most common bacterial pathogen isolated from middle ear aspirates, followed closely by non-typeable Haemophilus influenzae and Moraxella catarrhalis. H. influenzae is increasingly isolated in vaccinated populations.
          </p>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Etiology & Risk Factors</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Eustachian Tube Dysfunction:</strong> The primary pathogenetic mechanism, allowing reflux of nasopharyngeal secretions.</li>
          <li><strong>Age:</strong> Peak incidence between 6 to 18 months.</li>
          <li><strong>Adenoid Hypertrophy:</strong> Causes direct Eustachian tube orifice obstruction or acts as a reservoir for pathogenic biofilm.</li>
          <li><strong>Environmental Factors:</strong> Passive smoke exposure, crèche attendance, and absence of breastfeeding.</li>
        </ul>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Clinical Stages of AOM</h3>
        <p class="text-sm text-slate-500 mb-2">The clinical progression of untreated classic bacterial AOM can be divided into four distinct stages:</p>
        
        <div class="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-sm">
          <table class="min-w-full divide-y divide-slate-200 bg-white">
            <thead class="bg-slate-50 font-display">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Stage</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Pathology</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Otoscopic Findings</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Symptoms</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr>
                <td class="px-4 py-3 font-semibold text-slate-900">1. Stage of Tubal Occlusion</td>
                <td class="px-4 py-3">Closure of Eustachian tube leads to absorption of air, causing negative pressure.</td>
                <td class="px-4 py-3 text-amber-700">Retracted tympanic membrane, prominent lateral process of malleus.</td>
                <td class="px-4 py-3">Mild earache, hearing loss (conductive).</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold text-slate-900">2. Stage of Presuppuration</td>
                <td class="px-4 py-3">Prolonged negative pressure causes hyperemia and exudative effusion.</td>
                <td class="px-4 py-3 text-red-600">Cartwheel appearance of tympanic membrane (congested blood vessels along malleus).</td>
                <td class="px-4 py-3">Throbbing earache, high fever, restlessness.</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-slate-900">3. Stage of Suppuration</td>
                <td class="px-4 py-3">Pus formation under pressure in the middle ear cleft.</td>
                <td class="px-4 py-3 text-red-700 font-medium">Bulging tympanic membrane ("donut" or "nipple" sign where rupture is imminent).</td>
                <td class="px-4 py-3">Excruciating earache, toxic look, marked hearing loss, high-grade fever.</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold text-slate-900">4. Stage of Resolution/Rupture</td>
                <td class="px-4 py-3">Pressure causes micro-perforation of Pars Tensa, discharging pus.</td>
                <td class="px-4 py-3 text-emerald-600">Pulsatile discharge ("Lighthouse Sign") in external canal, small perforation visible.</td>
                <td class="px-4 py-3 font-medium text-emerald-700">Earache drops dramatically, fever subsides, otorrhea begins.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Diagnostic Methodology</h3>
        <p>Diagnosis is highly clinical, combining pediatric history and <strong>pneumatic otoscopy</strong>. Visualizing tympanic membrane mobility is the gold standard to differentiate AOM from Otitis Media with Effusion (OME).</p>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Management Guidelines</h3>
        <ol class="list-decimal pl-5 space-y-3">
          <li>
            <strong>First-Line Antibiotics:</strong> Oral <strong>Amoxicillin</strong> is the absolute drug of choice (80-90 mg/kg/day divided in 2 doses for pediatric patients).
          </li>
          <li>
            <strong>Beta-Lactamase Coverage:</strong> If the patient has received amoxicillin in the past 30 days or has concurrent conjunctivitis, escalate to <strong>Amoxicillin-Clavulanate</strong> (Co-amoxiclav).
          </li>
          <li>
            <strong>Surgical Intervention (Myringotomy):</strong> Indicated if there is excruciating pain, impending mastoiditis, or poor response to line antibiotics. 
            <br/><span class="text-xs text-slate-500 font-mono">Note: Myringotomy incision is typically done in the <strong>antero-inferior quadrant</strong> to avoid injuring the ossicular chain.</span>
          </li>
        </ol>

        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md my-4">
          <h4 class="font-bold text-amber-900">⚠️ Complications to Monitor</h4>
          <ul class="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
            <li><strong>Intratemporal:</strong> Acute Mastoiditis, Labyrinthitis, Facial Nerve Palsy, Petrositis (Gradenigo's Syndrome).</li>
            <li><strong>Intracranial:</strong> Epidural/Subdural Abscess, Meningitis, Brain Abscess (temporal lobe/cerebellar), Lateral Sinus Thrombophlebitis.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "topic-dns",
    subjectId: "sub-ent",
    sectionId: "sec-nose",
    chapterId: "chap-nasal-septum",
    title: "Deviated Nasal Septum (DNS)",
    slug: "deviated-nasal-septum-dns",
    summary: "Comprehensive breakdown of septal anatomy, types of deviations, clinical sequelae, Cottle's test, and comparison of SMR vs. Septoplasty surgery.",
    isPremium: true, // Premium notes, blurred/preview for guest
    pdfUrl: "/pdfs/deviated-nasal-septum-dns.pdf",
    pdfSize: "3.1 MB",
    readingTime: 12,
    order: 2,
    status: "PUBLISHED",
    seoTitle: "Deviated Nasal Septum (DNS) - SMR vs Septoplasty ENT Notes | Dr. Pulkit ENT",
    seoDescription: "Examine anatomical septal deviations (C-shaped, S-shaped, spurs, dislocations). Understand diagnostic criteria, Cottle's test, and surgical indications.",
    tags: ["Rhinology", "Surgical Anatomy", "Septoplasty", "USMLE Core"],
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-06-25T11:15:00Z",
    content: `
      <div class="space-y-6 text-slate-700">
        <p class="text-lg leading-relaxed">
          The nasal septum divides the nasal cavity into two halves. It consists of bony parts posteriorly (Perpendicular plate of Ethmoid and Vomer) and a cartilaginous part anteriorly (Quadrangular septal cartilage). A <strong>Deviated Nasal Septum (DNS)</strong> is a physical disorder of the nose involving a displacement of the nasal septum.
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md my-4">
          <h4 class="font-bold text-blue-900 flex items-center gap-2">
            🔑 Diagnostic Test: Cottle's Test
          </h4>
          <p class="text-blue-800 text-sm mt-1">
            Used to differentiate nasal valve stenosis from other causes of nasal obstruction. The cheek of the affected side is pulled laterally. If nasal airway patency improves, the test is positive, pointing to a nasal valve pathology (often associated with septal deviation at the valve level).
          </p>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Anatomical Classification & Types</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>C-Shaped Deviation:</strong> Unilateral deviation, simple bow in cartilage. Often compensated by contralateral inferior turbinate hypertrophy.</li>
          <li><strong>S-Shaped Deviation:</strong> Bilateral nasal obstruction, double curvature blocking both nostrils.</li>
          <li><strong>Septal Spur:</strong> A sharp shelf-like projection, usually at the junction of cartilage and bone. Often presses against the lateral wall, causing rhinogenic headaches (Sluder's neuralgia).</li>
          <li><strong>Anterior Dislocation:</strong> The caudal edge of the septal cartilage is dislocated into one of the nasal vestibules.</li>
        </ul>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Comparative Surgery Table: SMR vs. Septoplasty</h3>
        <p class="text-sm text-slate-500 mb-2">Surgical management is indicated if the deviation is symptomatic. SMR (Submucous Resection) and Septoplasty are the two standard surgical avenues:</p>

        <div class="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-sm">
          <table class="min-w-full divide-y divide-slate-200 bg-white">
            <thead class="bg-slate-50 font-display">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Parameter</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Submucous Resection (SMR)</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Septoplasty (Conservative)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr>
                <td class="px-4 py-3 font-semibold text-slate-900">Scope of Resection</td>
                <td class="px-4 py-3 text-red-600">Radical resection of a large portion of cartilage and bone. Only a small L-strut is left.</td>
                <td class="px-4 py-3 text-emerald-600">Conservative. Only the deviated parts are removed/reconstructed, preserving cartilage.</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold text-slate-900">Minimum Age</td>
                <td class="px-4 py-3">Contraindicated under 17-18 years (may arrest mid-facial development).</td>
                <td class="px-4 py-3">Can be performed in children (if severe, e.g. bilateral complete nasal block).</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-slate-900">Incision Type</td>
                <td class="px-4 py-3">Freer's Incision (bilateral mucoperichondrial elevation).</td>
                <td class="px-4 py-3">Killian's or Hemi-transfixion Incision (unilateral elevation).</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3 font-semibold text-slate-900">Risk of Septal Perforation</td>
                <td class="px-4 py-3 text-red-700 font-medium">Very high due to bilateral elevation and radical removal.</td>
                <td class="px-4 py-3 text-emerald-700 font-medium">Very low (safer procedure with mucosal preservation).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Pathological Sequelae</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li><strong>Compensatory Turbinate Hypertrophy:</strong> The inferior turbinate on the wide side enlarges to regulate airflow, causing paradoxical bilateral congestion.</li>
          <li><strong>Recurrent Sinusitis:</strong> Blockage of sinus ostia, preventing drainage of maxillary and ethmoid sinuses.</li>
          <li><strong>Epistaxis:</strong> Straining of mucosal blood vessels over a sharp spur, leading to dryness, crusting, and frequent bleeds.</li>
        </ol>
      </div>
    `
  },
  {
    id: "topic-tracheostomy",
    subjectId: "sub-ent",
    sectionId: "sec-throat",
    chapterId: "chap-pharynx-larynx",
    title: "Tracheostomy: Surgical Anatomy & Care",
    slug: "tracheostomy-surgical-anatomy-and-care",
    summary: "Critical review of tracheostomy. Indications, surgical technique step-by-step, emergency procedures, tubes (Portex vs. metal), and management of complications.",
    isPremium: true,
    pdfUrl: "/pdfs/tracheostomy-anatomy-care-dr-pulkit.pdf",
    pdfSize: "4.2 MB",
    readingTime: 15,
    order: 3,
    status: "PUBLISHED",
    seoTitle: "Tracheostomy: Indications, Procedures & Complications | Dr. Pulkit ENT",
    seoDescription: "An in-depth medical guide to tracheostomy. Learn the optimal tracheal ring placement (2nd, 3rd, 4th rings), tube types, and emergency management of complications.",
    tags: ["Laryngology", "Head and Neck", "Emergency Medicine", "Procedures"],
    createdAt: "2026-03-01T09:00:00Z",
    updatedAt: "2026-07-01T15:45:00Z",
    content: `
      <div class="space-y-6 text-slate-700">
        <p class="text-lg leading-relaxed">
          A <strong>Tracheostomy</strong> is a surgical procedure that creates an opening in the anterior wall of the trachea (windpipe) and inserts a tube to establish and maintain a direct airway. It is a critical airway procedure used in emergencies or as part of long-term mechanical ventilation.
        </p>

        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md my-4">
          <h4 class="font-bold text-red-950 flex items-center gap-2">
            🚨 Critical Anatomical Safety Landmark
          </h4>
          <p class="text-red-900 text-sm mt-1">
            The surgical window is ideally created through the <strong>2nd, 3rd, or 4th tracheal rings</strong>. Making the incision too high (at the 1st tracheal ring) carries an extremely high risk of causing subglottic stenosis due to perichondritis of the cricoid cartilage!
          </p>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Main Indications</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <h5 class="font-semibold text-slate-950 text-sm mb-1">1. Airway Obstruction</h5>
            <p class="text-xs text-slate-600">Laryngeal cancers, severe bilateral vocal cord palsy, angioedema, foreign body impaction, or severe trauma to maxilla/mandible.</p>
          </div>
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <h5 class="font-semibold text-slate-950 text-sm mb-1">2. Secretion Clearance</h5>
            <p class="text-xs text-slate-600">In patients with bulbar palsy, severe stroke, or chronic coma where cough reflexes are completely absent.</p>
          </div>
          <div class="p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <h5 class="font-semibold text-slate-950 text-sm mb-1">3. Long-term Ventilation</h5>
            <p class="text-xs text-slate-600">Patients on mechanical ventilators in the ICU for more than 7–14 days to reduce dead space and avoid vocal cord injury from endotracheal intubation.</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Step-by-Step Surgical Technique</h3>
        <ol class="list-decimal pl-5 space-y-3">
          <li><strong>Patient Position:</strong> Supine with neck hyperextended by placing a sandbag beneath the shoulders. This exposes the trachea.</li>
          <li><strong>Anesthesia:</strong> Local infiltration (1% lignocaine with adrenaline) along the midline, even under general anesthesia.</li>
          <li><strong>Incision:</strong> A horizontal skin incision (2 cm below the cricoid cartilage) or vertical midline incision.</li>
          <li><strong>Splitting the Midline:</strong> Strap muscles (sternohyoid, sternothyroid) are retracted laterally.</li>
          <li><strong>Thyroid Isthmus management:</strong> Retracted upwards or divided and transfixed to reach the pre-tracheal fascia.</li>
          <li><strong>Tracheotomy & Flap:</strong> A Björk flap (an inferiorly based tracheal flap) may be anchored to the skin.</li>
          <li><strong>Tube Insertion:</strong> Insertion of the pre-tested, cuffed tube with immediate confirmation of ventilation.</li>
        </ol>

        <h3 class="text-xl font-bold text-slate-900 border-b pb-2 mt-6">Complications Matrix</h3>
        <p class="text-sm text-slate-500 mb-2">Complications can occur intraoperatively, early postoperatively, or late:</p>

        <div class="overflow-x-auto my-4 border border-slate-200 rounded-lg shadow-sm">
          <table class="min-w-full divide-y divide-slate-200 bg-white">
            <thead class="bg-slate-50 font-display">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Immediate (During Surgery)</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Early Post-Op (Days 1–7)</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Late Post-Op (Weeks–Months)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr>
                <td class="px-4 py-3">Hemorrhage (anterior jugular veins or thyroid isthmus)</td>
                <td class="px-4 py-3">Accidental Decannulation (tube slips out) - <em>The most dangerous early complication</em></td>
                <td class="px-4 py-3">Tracheal Stenosis (due to high incision or cuff pressure necrosis)</td>
              </tr>
              <tr class="bg-slate-50/50">
                <td class="px-4 py-3">Apnea (due to sudden wash-out of CO₂ drive in chronic hypercapnic patients)</td>
                <td class="px-4 py-3">Subcutaneous Emphysema (air trapped under skin)</td>
                <td class="px-4 py-3">Tracheo-Esophageal Fistula (TEF) due to back-wall erosion</td>
              </tr>
              <tr>
                <td class="px-4 py-3">Pneumothorax / Pneumomediastinum (especially in pediatric patients with high domes of pleura)</td>
                <td class="px-4 py-3">Tube Blockage / Mucus Plug (prevented by humidified air and inner cannula cleaning)</td>
                <td class="px-4 py-3 font-semibold text-red-600">Tracheoinnominat-Artery Fistula (catastrophic fatal bleed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  }
];

export const MOCK_PRICING_PLANS = [
  {
    id: "plan-pro",
    name: "ENT Pro Access",
    price: "₹1,499",
    billing: "per month",
    description: "Perfect for resident doctors, interns, and students preparing for national level exams.",
    features: [
      "Access to all 100+ ENT Premium Online Notes",
      "Interactive 3D anatomical charts inside notes",
      "High-yield summaries & flashcard builders",
      "Online reading without ads",
      "Standard PDF download (limit 15 per month)",
      "Standard Community Support"
    ],
    ctaText: "Get Pro Access Now",
    popular: false
  },
  {
    id: "plan-premium",
    name: "ENT Elite Membership",
    price: "₹3,999",
    billing: "6 months",
    description: "Highly recommended for postgraduate surgical students, otology fellows, and clinical practitioners.",
    features: [
      "EVERYTHING in ENT Pro Access",
      "UNLIMITED PDF downloads of all notes",
      "Pre-loaded surgical video walkthroughs & explanations",
      "Dr. Pulkit's high-yield MCQ banks & quiz access",
      "Priority Access to future AI Tutor integration",
      "Personalized Email Q&A with Dr. Pulkit Agarwal",
      "Gold Badge Certificate upon completion"
    ],
    ctaText: "Unlock Premium Access",
    popular: true
  }
];

export const MOCK_TESTIMONIALS = [
  {
    name: "Dr. Rohit Sharma",
    role: "ENT Resident, AIIMS Delhi",
    text: "Dr. Pulkit's notes are a lifesaver. The conceptual clarity, clinical stages of AOM, and SMR vs Septoplasty comparisons are so clear. I scored a top rank in NEET-PG thanks to these lessons!",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Dr. Ananya Nair",
    role: "Final Year MBBS Student, KMC Manipal",
    text: "The ENT notes are structured brilliantly. Visualizing the otology and rhinology chapters made learning complex surgical procedures like tracheostomy or mastoidectomy seamless. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Dr. Kevin Matthews",
    role: "USMLE Candidate",
    text: "Staging and surgical landmarks are precisely detailed. Highly readable. Downloading the PDFs makes revision incredibly easy on my tablet. Worth every penny!",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150"
  }
];

export const MOCK_FAQS = [
  {
    question: "Who is Dr. Pulkit Agarwal?",
    answer: "Dr. Pulkit Agarwal is a highly regarded Consultant Otorhinolaryngologist (ENT Surgeon) with years of experience teaching medical students, ENT residents, and preparing professionals for competitive entrance examinations."
  },
  {
    question: "What is the difference between Guest and Member accounts?",
    answer: "Guests can read premium notes online, explore chapters, and complete search results, but they cannot download PDF versions of Dr. Pulkit's specialized notes. Members enjoy distraction-free learning, unlimited embedded high-quality PDF downloads, MCQs, and priority assistance."
  },
  {
    question: "How do I download the medical PDF notes?",
    answer: "If you have an active membership, a secure 'Download PDF' button will appear in the reading toolbar of every note. If you are a guest, clicking 'Download PDF' will safely prompt a quick login/registration screen, returning you immediately to your spot upon verification."
  },
  {
    question: "Can I cancel my membership or request a refund?",
    answer: "Yes, you can cancel your membership at any time from your member dashboard. We offer a friendly, hassle-free 100% refund within the first 7 days of purchase in accordance with our Refund Policy."
  },
  {
    question: "Are there quizzes, flashcards, or videos available?",
    answer: "Yes, these are part of our future expansion roadmap! The platform is architected to seamlessly add these components. Active Premium members will receive automatic early-access priority to these modules when launched."
  }
];

// Seed users for demoing Guest, Member, Admin roles
export const DEMO_USERS = {
  guest: null,
  member: {
    id: "user-member",
    fullName: "Dr. Sarah Jenkins",
    email: "member@entplatform.com",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
    role: UserRole.MEMBER,
    status: UserStatus.ACTIVE,
    provider: AuthProvider.EMAIL,
    preferences: {
      theme: Theme.LIGHT,
      emailNotifications: true,
      marketingEmails: false
    },
    membership: {
      status: MembershipStatus.ACTIVE,
      planId: "plan-premium",
      planName: "ENT Elite Membership",
      expiresAt: "2027-01-11T12:00:00Z"
    },
    createdAt: "2026-02-14T09:15:00Z",
    updatedAt: "2026-07-01T10:00:00Z"
  },
  admin: {
    id: "user-admin",
    fullName: "Dr. Pulkit Agarwal",
    email: "pulkit.ent@gmail.com",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
    provider: AuthProvider.GOOGLE,
    preferences: {
      theme: Theme.LIGHT,
      emailNotifications: true,
      marketingEmails: true
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-07-10T18:30:00Z"
  }
};
