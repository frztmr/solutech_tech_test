import Image from "next/image";
import HeaderBar from "@/components/HeaderBar";

export default function Home() {
  const products = [
    {
      id: "speaker",
      title: "GMC Speaker Collection",
      tagline: "High-Fidelity Audio",
      desc: "Experience ultimate clarity and deep bass. Engineered for audiophiles who demand nothing but the absolute best sound signature.",
      features: ["Active Subwoofer System", "Bluetooth 5.3 & Optical Input", "RGB Sync Ambient Lighting"],
      image: "/speaker.png",
      color: "from-blue-600/20 to-cyan-500/20",
      glowColor: "bg-blue-500/10",
    },
    {
      id: "kipas",
      title: "GMC Smart Cooling Fans",
      tagline: "Silent & Powerful Breeze",
      desc: "Aerodynamic blades coupled with robust motors to deliver maximum airflow with minimal sound footprint.",
      features: ["Whisper-Quiet Technology", "Multi-Speed Controls", "Energy Efficiency Certified"],
      image: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-cyan-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314.707-.707M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
        </svg>
      ),
      color: "from-cyan-600/20 to-teal-500/20",
      glowColor: "bg-cyan-500/10",
    },
    {
      id: "kompor",
      title: "GMC Induction & Gas Cookers",
      tagline: "Precision Kitchen Technology",
      desc: "Heat up your culinary imagination. Precision temperature control makes cooking an absolute pleasure every day.",
      features: ["Rapid Heating Element", "Double Burner Safety Guard", "Easy-to-clean Tempered Glass"],
      image: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
        </svg>
      ),
      color: "from-amber-600/20 to-red-500/20",
      glowColor: "bg-amber-500/10",
    },
    {
      id: "grill",
      title: "GMC Electric BBQ Grills",
      tagline: "Premium Indoor Sizzle",
      desc: "Gather around for a perfect barbecue feast indoors. Smoke-reduced heating profiles and non-stick grid surfaces.",
      features: ["Adjustable Heat Thermostat", "Non-stick Diecast Aluminum Plate", "Detachable Oil Drip Tray"],
      image: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
        </svg>
      ),
      color: "from-red-600/20 to-orange-500/20",
      glowColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#060c0e] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambient Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-900/15 blur-[120px]"></div>
        <div className="absolute top-[200px] right-[5%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px]"></div>
      </div>

      {/* Header Bar */}
      <HeaderBar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 z-10">
        {/* Mirroring the dark atmospheric gradient of the user's screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b1e] via-[#050b0c] to-black opacity-90 z-[-1]"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">NEW ARRIVAL</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-400">
              REDEFINE YOUR <br />
              <span className="text-cyan-400 shadow-cyan-400/10 text-glow">SOUND EXPERIENCE</span>
            </h1>
            
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Meet the brand new GMC Multimedia Active Speaker. Engineered with cutting-edge acoustics to provide crystal clear highs, warm mids, and deep, room-shaking bass.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#speaker"
                className="flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-bold text-sm tracking-wider transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
              >
                EXPLORE NOW
              </a>
              <a
                href="#tentang-kami"
                className="flex items-center justify-center h-12 px-8 rounded-full border border-white/20 text-white font-bold text-sm tracking-wider transition-all duration-300 hover:bg-white/5 hover:border-white/50"
              >
                LEARN MORE
              </a>
            </div>
          </div>

          {/* Hero Product Render */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full bg-cyan-500/10 blur-[80px] z-[-1] animate-pulse"></div>
            <div className="relative group w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-6 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/5">
              
              {/* Product Background Plate */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
              
              <div className="relative w-full h-full flex flex-col justify-between">
                {/* Badge */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-[11px] font-bold tracking-widest text-white/50 uppercase">GMC-888 AUDIO PRO</span>
                  <span className="text-xs font-bold text-cyan-400">$299</span>
                </div>
                
                {/* Main Product Image */}
                <div className="flex-1 flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src="/speaker.png"
                    alt="GMC Premium Speaker"
                    width={320}
                    height={380}
                    priority
                    className="object-contain drop-shadow-[0_20px_50px_rgba(6,182,212,0.3)] filter brightness-110"
                  />
                </div>

                {/* Micro Details */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-left">
                  <div>
                    <p className="text-xs font-semibold text-white">Active Multimedia Speaker</p>
                    <p className="text-[10px] text-neutral-400">Class D Amplifier & Bluetooth 5.3</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS DISPLAY SECTION */}
      <section className="relative py-24 px-6 z-10 bg-gradient-to-b from-black to-[#05090a]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase mb-3">OUR PORTFOLIO</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Innovative Solutions for Every Corner of Your Home
            </p>
            <div className="w-12 h-1 bg-cyan-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                id={prod.id}
                className={`relative group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br ${prod.color} p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:shadow-xl scroll-mt-24`}
              >
                {/* Glow Background */}
                <div className={`absolute top-0 right-0 w-[200px] h-[200px] rounded-full ${prod.glowColor} blur-[60px] opacity-50 z-0`}></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">{prod.tagline}</span>
                    <h3 className="text-2xl font-bold text-white leading-tight">{prod.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{prod.desc}</p>
                    
                    <ul className="space-y-2 pt-2">
                      {prod.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Icon or Image container */}
                  <div className="w-full md:w-auto flex justify-center md:justify-end items-center py-4 md:py-0">
                    {prod.image ? (
                      <div className="relative w-40 h-44 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(6,182,212,0.2)]">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          width={140}
                          height={160}
                          className="object-contain filter brightness-115 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
                        {prod.icon}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Learn more about features</span>
                  <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TENTANG KAMI (ABOUT US) SECTION */}
      <section id="tentang-kami" className="relative py-24 px-6 z-10 bg-[#050a0b] scroll-mt-24">
        {/* Glow */}
        <div className="absolute top-[50%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.01] p-10 flex flex-col justify-between aspect-square max-w-[450px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-transparent"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3b5cbd] to-[#1d3580] shadow-md">
                    <span className="text-[13px] font-black text-white leading-none">gmc</span>
                  </div>
                  <span className="text-xl font-bold tracking-tighter">GMC Indonesia</span>
                </div>
                <p className="mt-8 text-lg font-medium text-neutral-300 leading-relaxed">
                  "Menghadirkan harmoni suara dan inovasi peralatan rumah tangga terbaik ke setiap keluarga di seluruh Indonesia."
                </p>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-6 mt-8 flex justify-between text-left">
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">20+</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Tahun Pengalaman</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">100%</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Kualitas Indonesia</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">5JT+</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Pengguna Setia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">TENTANG KAMI</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Inovasi Elektronik Lokal Berkualitas Internasional
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Didirikan dengan komitmen untuk mempersembahkan produk elektronik terbaik bagi masyarakat Indonesia, GMC telah tumbuh menjadi salah satu merek peralatan rumah tangga terkemuka di tanah air. Mulai dari lini active speaker legendaris kami yang terkenal dengan dentuman bass super mantap, hingga kompor gas, kipas angin pintar, dan alat pemanggang listrik.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Kami percaya bahwa teknologi berkualitas tinggi tidak harus mahal. Dengan tim R&D lokal yang memahami kebutuhan keluarga Indonesia, setiap produk GMC dirancang untuk tahan lama, efisien, dan modern.
            </p>
            <div className="pt-4">
              <a
                href="#kontak"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors duration-300 group"
              >
                HUBUNGI KAMI
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK (CONTACT) SECTION */}
      <section id="kontak" className="relative py-24 px-6 z-10 bg-gradient-to-b from-[#050a0b] to-[#030607] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase mb-3">KONTAK KAMI</h2>
            <p className="text-3xl font-bold tracking-tight text-white">Hubungi Kami Untuk Layanan & Penjualan</p>
            <p className="text-sm text-neutral-400 mt-3">Apakah Anda memiliki pertanyaan atau ingin menjadi agen kemitraan kami?</p>
          </div>

          {/* Form */}
          <form className="space-y-6 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap Anda"
                  className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Alamat Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan alamat email Anda"
                  className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Subjek Pesan</label>
              <input
                type="text"
                id="subject"
                placeholder="Bagaimana kami bisa membantu Anda?"
                className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Isi Pesan</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tuliskan pesan lengkap Anda di sini..."
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-white text-black font-bold text-sm tracking-wider hover:bg-neutral-200 active:scale-95 transition-all duration-300 shadow-md shadow-white/5"
            >
              KIRIM PESAN
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/5 bg-[#030607] z-10 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#3b5cbd] to-[#1d3580]">
              <span className="text-[11px] font-black text-white leading-none">gmc</span>
            </div>
            <span className="text-sm font-bold text-white tracking-tighter">GMC Electronics</span>
          </div>
          
          <p>© {new Date().getFullYear()} GMC Store. All rights reserved. Made in Indonesia.</p>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

