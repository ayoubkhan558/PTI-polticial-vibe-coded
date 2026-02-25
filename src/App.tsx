/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ArrowRight, 
  Play, 
  Users, 
  Flag, 
  Calendar, 
  Heart, 
  ChevronRight,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Scroll listener for header
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-reveal', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      });

      gsap.from('.hero-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });

      gsap.from('.floating-card', {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'back.out(1.7)'
      });

      // Stats Animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });

      // Vision Animation
      gsap.from('.vision-content > *', {
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top 70%',
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Leadership Animation
      gsap.from('.leader-card', {
        scrollTrigger: {
          trigger: leadershipRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // Principles Animation
      gsap.from('.principle-item', {
        scrollTrigger: {
          trigger: principlesRef.current,
          start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    const themeStr = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeStr);
    localStorage.setItem('theme', themeStr);
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="font-display text-2xl tracking-tighter">PTI.</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['About', 'Leadership', 'News', 'Events', 'Join', 'Donate'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-fg/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden sm:flex btn-primary text-sm py-2 px-6">
              Join Movement
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-bg transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['About', 'Leadership', 'News', 'Events', 'Join', 'Donate'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-3xl font-display"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary mt-4">Join Movement</button>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 hero-reveal">
                Official Movement
              </span>
              <h1 className="text-display mb-8 hero-reveal text-balance">
                Justice. <br />
                <span className="text-primary relative">
                  Humanity.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span> <br />
                Self-Esteem.
              </h1>
              <p className="text-xl text-fg/70 max-w-lg mb-10 hero-reveal">
                Empowering the people of Pakistan through accountability, rule of law, and a vision for a prosperous, sovereign nation.
              </p>
              <div className="flex flex-wrap gap-4 hero-reveal">
                <button className="btn-primary">
                  Support PTI <ArrowRight size={18} />
                </button>
                <button className="btn-outline">Learn Our Vision</button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl hero-image">
                <img 
                  src="https://picsum.photos/seed/pti-hero/800/1000" 
                  alt="Political Leadership" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl shadow-2xl max-w-xs floating-card hidden sm:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">25M+</div>
                    <div className="text-xs uppercase tracking-wider opacity-60">Supporters</div>
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  A nationwide movement driven by the passion of millions seeking real change.
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="section-padding bg-fg/5">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Years of Struggle', value: '28+' },
                { label: 'Supporters Nationwide', value: '25M+' },
                { label: 'Provinces Represented', value: '4/4' },
                { label: 'Major Campaigns', value: '150+' },
              ].map((stat, i) => (
                <div key={i} className="stat-item text-center md:text-left">
                  <div className="text-5xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm uppercase tracking-widest opacity-60 font-medium">{stat.label}</div>
                  <div className="h-1 w-12 bg-primary/20 mt-4 mx-auto md:mx-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="about" ref={visionRef} className="section-padding overflow-hidden">
          <div className="container-custom grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img src="https://picsum.photos/seed/pti1/400/500" alt="Vision 1" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/pti2/400/300" alt="Vision 2" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/pti3/400/300" alt="Vision 3" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/pti4/400/500" alt="Vision 4" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                <Play fill="currentColor" size={32} />
              </div>
            </div>

            <div className="vision-content order-1 lg:order-2">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Our Vision</span>
              <h2 className="text-h2 mb-8">Building a <span className="text-primary">Naya Pakistan</span> for Every Citizen.</h2>
              <p className="text-lg text-fg/70 mb-8">
                Pakistan Tehreek-e-Insaf is not just a political party; it is a movement for justice. We believe in a welfare state where the law is supreme, and every citizen has equal opportunities.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Rule of Law & Accountability',
                  'Economic Sovereignty & Growth',
                  'Social Welfare & Healthcare for All',
                  'Independent Foreign Policy'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="btn-primary">Explore Our Manifesto</button>
            </div>
          </div>
        </section>

        {/* Principles Section (Dark) */}
        <section ref={principlesRef} className="section-padding bg-dark text-neutral">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-h2 mb-8">Core Principles of Our Movement</h2>
                <p className="text-xl opacity-60 max-w-md">
                  Our foundation is built on three pillars that define our struggle and our promise to the nation.
                </p>
              </div>
              <div className="space-y-12">
                {[
                  { num: '01', title: 'Insaaf (Justice)', desc: 'Ensuring that the law applies equally to the powerful and the weak alike.' },
                  { num: '02', title: 'Insaniyat (Humanity)', desc: 'Creating a compassionate society that looks after its most vulnerable members.' },
                  { num: '03', title: 'Khuddari (Self-Esteem)', desc: 'A sovereign nation that stands tall in the comity of nations with dignity.' },
                ].map((item, i) => (
                  <div key={i} className="principle-item group cursor-pointer border-b border-white/10 pb-8 last:border-0">
                    <div className="flex items-start gap-6">
                      <span className="text-primary font-mono text-xl font-bold">{item.num}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl group-hover:text-primary transition-colors">{item.title}</h3>
                          <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                        </div>
                        <p className="opacity-60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" ref={leadershipRef} className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Leadership</span>
                <h2 className="text-h2">The Visionaries Leading the Change</h2>
              </div>
              <button className="btn-outline">View All Leaders</button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Imran Khan', role: 'Founding Chairman', img: 'https://picsum.photos/seed/ik/400/500' },
                { name: 'Barrister Gohar', role: 'Chairman', img: 'https://picsum.photos/seed/bg/400/500' },
                { name: 'Omar Ayub', role: 'Secretary General', img: 'https://picsum.photos/seed/oa/400/500' },
                { name: 'Shibli Faraz', role: 'Opposition Leader', img: 'https://picsum.photos/seed/sf/400/500' },
              ].map((leader, i) => (
                <div key={i} className="leader-card group">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={leader.img} 
                      alt={leader.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-4">
                        <Twitter size={18} className="text-white hover:text-primary cursor-pointer" />
                        <Facebook size={18} className="text-white hover:text-primary cursor-pointer" />
                        <Instagram size={18} className="text-white hover:text-primary cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{leader.name}</h4>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-medium">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="section-padding bg-fg/5">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-h2 mb-4">Upcoming Campaigns & Events</h2>
              <p className="opacity-60">Stay updated with our latest movements and join us on the ground.</p>
            </div>

            <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x">
              {[
                { title: 'Nationwide Peace Rally', date: 'March 15, 2026', loc: 'Islamabad', img: 'https://picsum.photos/seed/ev1/800/500' },
                { title: 'Youth Convention', date: 'March 22, 2026', loc: 'Lahore', img: 'https://picsum.photos/seed/ev2/800/500' },
                { title: 'Economic Reform Seminar', date: 'April 05, 2026', loc: 'Karachi', img: 'https://picsum.photos/seed/ev3/800/500' },
              ].map((event, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[600px] snap-center group relative aspect-video rounded-3xl overflow-hidden">
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase">{event.date}</span>
                      <span className="text-xs opacity-80 uppercase tracking-widest">{event.loc}</span>
                    </div>
                    <h3 className="text-3xl font-display mb-4">{event.title}</h3>
                    <button className="flex items-center gap-2 text-sm font-bold group/btn">
                      Register Now <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join / Volunteer Section */}
        <section id="join" className="section-padding">
          <div className="container-custom">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-h2 mb-8">Be the Change You Want to See.</h2>
                  <p className="text-xl opacity-80 mb-12">
                    Join thousands of volunteers across the country and overseas who are working tirelessly for a better Pakistan.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <Flag size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Nationwide Network</div>
                        <div className="text-sm opacity-60">Active in every district of Pakistan.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Regular Training</div>
                        <div className="text-sm opacity-60">Workshops on leadership and digital activism.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white text-dark p-8 md:p-12 rounded-3xl shadow-2xl">
                  <h3 className="text-2xl mb-8">Volunteer Registration</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase opacity-60">Full Name</label>
                        <input type="text" className="w-full bg-fg/5 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase opacity-60">Email Address</label>
                        <input type="email" className="w-full bg-fg/5 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase opacity-60">City</label>
                        <input type="text" className="w-full bg-fg/5 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="Islamabad" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase opacity-60">Phone Number</label>
                        <input type="tel" className="w-full bg-fg/5 border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none" placeholder="+92 300 1234567" />
                      </div>
                    </div>
                    <button className="w-full btn-primary justify-center py-4">Submit Application</button>
                  </form>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section id="donate" className="section-padding bg-fg/5">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Support Us</span>
                <h2 className="text-h2 mb-8">Your Contribution Fuels the Movement.</h2>
                <p className="text-lg opacity-60 mb-8">
                  PTI is a self-funded movement. Every penny you donate goes directly into our campaigns for justice and the welfare of the people.
                </p>
                <div className="bg-bg p-8 rounded-2xl border border-border mb-8">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Campaign Goal</span>
                    <span className="text-primary font-bold">75% Achieved</span>
                  </div>
                  <div className="w-full h-3 bg-fg/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm opacity-60">
                    <span>Raised: $1.2M</span>
                    <span>Goal: $1.6M</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[10, 50, 100, 500].map((amount) => (
                  <button key={amount} className="p-8 rounded-2xl border border-border bg-bg hover:border-primary hover:text-primary transition-all text-2xl font-bold">
                    ${amount}
                  </button>
                ))}
                <div className="col-span-2 relative">
                  <input type="number" className="w-full bg-bg border border-border rounded-2xl p-6 outline-none focus:border-primary" placeholder="Custom Amount" />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary py-2 px-6">Donate</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-neutral pt-24 pb-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
                <span className="font-display text-2xl tracking-tighter">PTI.</span>
              </div>
              <p className="opacity-60 mb-8 leading-relaxed">
                The official movement for justice, humanity, and self-esteem in Pakistan. Join us in building a prosperous nation.
              </p>
              <div className="flex gap-4">
                {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Quick Links</h4>
              <ul className="space-y-4 opacity-60">
                {['Our Vision', 'Leadership', 'Latest News', 'Upcoming Events', 'Join as Volunteer', 'Donate Now'].map((link) => (
                  <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Contact Us</h4>
              <ul className="space-y-4 opacity-60">
                <li>PTI Central Secretariat, Islamabad</li>
                <li>info@insaf.pk</li>
                <li>+92 51 1234567</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Newsletter</h4>
              <p className="opacity-60 mb-6 text-sm">Subscribe to get the latest updates and campaign news.</p>
              <div className="relative">
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-primary" placeholder="Your email" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-40">
            <p>© 2026 Pakistan Tehreek-e-Insaf. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
