import React from 'react';
import drBharatImg from '@/assets/drBharat.jpeg';
import drChandrakantImg from '@/assets/drChandrakant.jpeg';

const imageMap = {
  drBharat: drBharatImg,
  drChandrakant: drChandrakantImg
};

export default function DoctorCard({ id, name, title, bio }) {
  const img = imageMap[id] || imageMap.drBharat;
  return (
    <div className="doctor-card" style={{display:'flex',gap:12,alignItems:'center',padding:12,border:'1px solid #eee',borderRadius:8}}>
      <img src={img} alt={name} style={{width:96,height:96,objectFit:'cover',borderRadius:8}} />
      <div>
        <h4 style={{margin:0}}>{name}</h4>
        <div style={{color:'#666',fontSize:13}}>{title}</div>
        {bio && <p style={{marginTop:8,fontSize:13}}>{bio}</p>}
      </div>
    </div>
  );
}