import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ConsentForm({ open, onClose, onAccept }) {
    if (!open) return null;
    const [form, setForm] = useState({
        fullName: '',
        ageGender: '',
        contact: '',
        email: '',
        address: '',
        govId: '',
        representativeName: '',
        representativeRelation: '',
        representativeContact: '',
        agreeElectronic: false,
        checklist: {
            scopeRead: false,
            noEmergency: false,
            accuracy: false,
            confidentiality: false,
            informedConsent: false
        }
    });

    const update = (k, v) => setForm(s => ({ ...s, [k]: v }));
    const updateChecklist = (k, v) => setForm(s => ({ ...s, checklist: { ...s.checklist, [k]: v } }));

    const isValid = form.fullName.trim() && form.contact.trim() && form.email.trim() && Object.values(form.checklist).every(Boolean) && form.agreeElectronic;

    return (
        <div className="consent-modal" style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999,padding:'20px'}}>
            <div style={{background:'#fff',padding:'30px',width:'min(900px,95%)',maxHeight:'85vh',overflow:'auto',borderRadius:'12px',boxShadow:'0 10px 40px rgba(0,0,0,0.3)'}}>
                {/* Close Button */}
                <button onClick={onClose} style={{float:'right',background:'none',border:'none',cursor:'pointer',padding:'0',marginTop:'-5px'}}>
                    <X size={24} />
                </button>

                <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px',color:'#1a1a1a'}}>Patient Consent Declaration</h1>
                <p style={{fontSize:'16px',fontWeight:'600',color:'#333',marginBottom:'16px'}}>Online Medical Second Opinion Services</p>

                {/* Tagline Section */}
                <div style={{background:'#f0f7ff',padding:'20px',borderRadius:'8px',marginBottom:'24px',borderLeft:'4px solid #0066cc'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'600',color:'#0066cc',margin:'0 0 8px 0'}}>Expert Medical Second Opinions. Confident Health Decisions.</h3>
                    <p style={{fontSize:'14px',color:'#333',margin:'8px 0'}}>When it comes to your health, clarity matters. Kant Healthcare has experienced, certified specialists across multiple disciplines to provide reliable and evidence-based second medical opinions — all from the comfort of your home.</p>
                    <p style={{fontSize:'14px',color:'#333',margin:'8px 0'}}>Whether you've been advised surgery, received a complex diagnosis, or want reassurance before starting treatment, we help you make informed decisions with confidence.</p>
                    <div style={{fontSize:'14px',color:'#333',margin:'12px 0'}}>
                        <p style={{margin:'4px 0'}}>✔ Detailed Case Review</p>
                        <p style={{margin:'4px 0'}}>✔ Multispecialty Expert Panel</p>
                        <p style={{margin:'4px 0'}}>✔ Secure & Confidential Process</p>
                        <p style={{margin:'4px 0'}}>✔ Quick Turnaround Time</p>
                    </div>
                    <p style={{fontSize:'14px',fontWeight:'600',color:'#0066cc',margin:'12px 0 0 0'}}>Your health deserves certainty. Get the right perspective — before you decide.</p>
                </div>

                {/* Medical Disclaimer */}
                <div style={{background:'#fff3cd',padding:'16px',borderRadius:'8px',marginBottom:'24px',borderLeft:'4px solid #ff9800'}}>
                    <h3 style={{fontSize:'16px',fontWeight:'600',color:'#ff6600',margin:'0 0 12px 0'}}>Medical Disclaimer</h3>
                    <p style={{fontSize:'13px',color:'#333',margin:'8px 0',lineHeight:'1.6'}}>The information and medical opinions provided through this website are intended solely for informational and advisory purposes and do not constitute a substitute for in-person clinical examination, diagnosis, or treatment.</p>
                    <p style={{fontSize:'13px',color:'#333',margin:'8px 0',lineHeight:'1.6'}}>The second opinion is based entirely on the medical records, reports, imaging, and information provided by the patient or their authorized representative. The accuracy and completeness of the opinion depend upon the accuracy and completeness of the documents submitted.</p>
                    <p style={{fontSize:'13px',color:'#333',margin:'8px 0',lineHeight:'1.6'}}>This platform does not provide emergency medical services. In case of a medical emergency, please contact your nearest hospital or emergency services immediately.</p>
                    <ul style={{fontSize:'13px',color:'#333',margin:'8px 0 0 20px',lineHeight:'1.6'}}>
                        <li>Does not establish a doctor–patient relationship beyond the scope of a record-based second opinion.</li>
                        <li>Is not intended to replace your treating physician.</li>
                        <li>Should not be interpreted as a definitive diagnosis without physical examination.</li>
                        <li>Should be discussed with your primary treating doctor before making any healthcare decisions.</li>
                    </ul>
                </div>

                <hr style={{margin:'24px 0'}} />

                <h2 style={{fontSize:'18px',fontWeight:'600',margin:'24px 0 16px 0',color:'#1a1a1a'}}>1. Patient Details</h2>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Full Name *<br/></label>
                        <input type="text" value={form.fullName} onChange={e=>update('fullName', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'14px',boxSizing:'border-box'}} />
                    </div>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Age / Gender<br/></label>
                        <input
                          type="text"
                          value={form.ageGender}
                          onChange={e => update('ageGender', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                          }}
                        />
                    </div>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Contact Number *<br/></label>
                        <input type="tel" value={form.contact} onChange={e=>update('contact', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'14px',boxSizing:'border-box'}} />
                    </div>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Email ID *<br/></label>
                        <input type="email" value={form.email} onChange={e=>update('email', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'14px',boxSizing:'border-box'}} />
                    </div>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Address<br/></label>
                        <input type="text" value={form.address} onChange={e=>update('address', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'14px',boxSizing:'border-box'}} />
                    </div>
                    <div>
                        <label style={{display:'block',fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>Government ID (Optional)<br/></label>
                        <input type="text" value={form.govId} onChange={e=>update('govId', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'14px',boxSizing:'border-box'}} />
                    </div>
                </div>

                <h2 style={{fontSize:'18px',fontWeight:'600',margin:'24px 0 16px 0',color:'#1a1a1a'}}>2. Voluntary Request for Second Opinion</h2>
                <p style={{fontSize:'14px',color:'#333',margin:'8px 0',lineHeight:'1.6'}}>I hereby voluntarily request a medical second opinion based on the medical records, reports, imaging, prescriptions, and other information provided by me or my authorized representative.</p>
                <p style={{fontSize:'14px',color:'#333',margin:'8px 0',lineHeight:'1.6'}}>I understand that this is a record-based expert review and not a substitute for in-person clinical examination.</p>

                <h2 style={{fontSize:'18px',fontWeight:'600',margin:'24px 0 16px 0',color:'#1a1a1a'}}>3. Understanding of Scope & Limitations</h2>
                <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.scopeRead} onChange={e=>updateChecklist('scopeRead', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>The opinion is based solely on the documents and information submitted.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.noEmergency} onChange={e=>updateChecklist('noEmergency', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>No physical examination will be conducted. This service does not replace my treating doctor.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.accuracy} onChange={e=>updateChecklist('accuracy', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>The opinion provided is advisory in nature. Final treatment decisions remain my responsibility in consultation with my primary treating physician.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.confidentiality} onChange={e=>updateChecklist('confidentiality', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>This service is not meant for medical emergencies. In case of emergency, I will seek immediate in-person medical attention.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.informedConsent} onChange={e=>updateChecklist('informedConsent', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>I have read and understood the above information and provide my informed consent voluntarily.</span>
                    </label>
                </div>

                <h2 style={{fontSize:'18px',fontWeight:'600',margin:'24px 0 16px 0',color:'#1a1a1a'}}>4. Data Use & Confidentiality</h2>
                <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.confidentiality} onChange={e=>updateChecklist('confidentiality', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>I consent to the review of my medical records by qualified registered medical practitioners.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.confidentiality} onChange={e=>updateChecklist('confidentiality', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>I authorize the platform to store and process my data securely for the purpose of providing this second opinion.</span>
                    </label>
                    <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer'}}>
                        <input type="checkbox" checked={form.checklist.confidentiality} onChange={e=>updateChecklist('confidentiality', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                        <span>I understand that my data will be handled confidentially.</span>
                    </label>
                </div>

                <h2 style={{fontSize:'18px',fontWeight:'600',margin:'24px 0 16px 0',color:'#1a1a1a'}}>5. Electronic Consent</h2>
                <label style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',cursor:'pointer',marginBottom:'20px'}}>
                    <input type="checkbox" checked={form.agreeElectronic} onChange={e=>update('agreeElectronic', e.target.checked)} style={{marginTop:'2px',width:'18px',height:'18px',cursor:'pointer',flexShrink:0}} />
                    <span>I agree to provide electronic consent and acknowledge that ticking this checkbox shall be considered legally valid consent.</span>
                </label>

                <div style={{display:'flex',justifyContent:'flex-end',gap:'12px',marginTop:'30px',paddingTop:'20px',borderTop:'1px solid #ddd'}}>
                    <button onClick={onClose} style={{padding:'10px 20px',border:'1px solid #ddd',borderRadius:'6px',background:'#f5f5f5',cursor:'pointer',fontSize:'14px',fontWeight:'600',color:'#333',transition:'all 0.2s'}}>
                        Cancel
                    </button>
                    <button disabled={!isValid} onClick={()=>onAccept(form)} style={{padding:'10px 24px',border:'none',borderRadius:'6px',background:isValid?'#0066cc':'#ccc',color:'white',cursor:isValid?'pointer':'not-allowed',fontSize:'14px',fontWeight:'600',transition:'all 0.2s'}}>
                        Accept & Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}