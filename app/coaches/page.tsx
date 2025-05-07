"use-client"

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconLink, IconMail, IconPhone, IconWorld } from '@tabler/icons-react';
import 'animate.css';
import Image, { StaticImageData } from "next/image";

// Import coach images
import CoachJhero from "@/public/images/coaches/Kiffyman1.jpg";
import CoachChristopher from "@/public/images/coaches/Kryzz 1.jpg";
import CoachJillianne from "@/public/images/coaches/Kuya Bhie 1.jpg";
import CoachRafael from "@/public/images/coaches/Raf1.jpg";
import CoachEnver from "@/public/images/coaches/Smartfit1.jpg";

// Define props type for CoachCard component
interface CoachCardProps {
    imageSrc: string | StaticImageData;
    name: string;
    nickname: string;
    title: string;
    contact?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
    otherLinks?: {
        url: string;
    }[];
}

export default async function Coaches() {
    // Coach data
    const coaches = [
        {
            imageSrc: CoachChristopher,
            name: "Christopher Flores",
            nickname: "Coach Kryzz",
            title: "Owner and Fitness Coach at 3K's Muscle Fitness Center",
            contact: "+63 919 230 5598",
            facebook: "https://www.facebook.com/kryzzryann.flores",
            otherLinks: [
                {
                    url: "https://www.facebook.com/3ksmusclefitnesscenter"
                }
            ]
        },
        {
            imageSrc: CoachJillianne,
            name: "Jillianne Dacay",
            nickname: "Kuya Bhie / Baki ng Pinas",
            title: "Fitness Coach & Influencer l Getwheysted Athlete",
            contact: "+63 917 123 4321",
            facebook: "https://www.facebook.com/Ianniopagodna06",
            instagram: "https://www.instagram.com/kuya_bhie/",
            tiktok: "https://www.tiktok.com/@kuyabhie06"
        },
        {
            imageSrc: CoachJhero,
            name: "Jhero Rich Llanto",
            nickname: "Kiffyman",
            title: "Fitness Coach & Influencer",
            contact: "+63 995 960 8415",
            facebook: "https://www.facebook.com/profile.php?id=61573415000550",
            instagram: "https://www.instagram.com/jherorichllanto",
            tiktok: "https://www.tiktok.com/@jherorichllanto"
        },
        {
            imageSrc: CoachEnver,
            name: "Enver Paraiso Florendo",
            nickname: "SMARTFit",
            title: "Fitness Coach & Influencer, Founder of SMARTFitnessPH",
            facebook: "https://www.facebook.com/SMARTFit",
            tiktok: "https://www.tiktok.com/@enverparaisoflorendo?lang=en",
            website: "https://taplink.cc/smartfitnessph",
            otherLinks: [
                {
                    url: "https://www.smartfitcoaching.me/90-day-challenge-starts-here"
                }
            ]
        },
        {
            imageSrc: CoachRafael,
            name: "Rafael Martinez",
            nickname: "Coach Raf",
            title: "Online Fatloss Coach",
            email: "rjshredz@gmail.com",
            facebook: "https://www.facebook.com/teammrtnzcoaching",
            instagram: "https://www.instagram.com/rjrmartinez",
            tiktok: "https://www.tiktok.com/@rjrmartinez"
        }
    ];

    return (
        <main>
            <Header />
            <section className="page-heading bg-image">
                <div className="pt-[200px] pb-[75px] page-width">
                    <div className="page-heading-wrapper uppercase">
                        <h1 className="text-white inner-page-headings">Coaches</h1>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-[40px] bg-black py-[100px]">
                <div className="flex flex-col gap-[40px] page-width animate__animated animate__fadeInUp duration-1000">
                    <div className="flex flex-col items-center gap-[20px]">
                        <div className="flex justify-center">
                            <span className="section-label text-center">Fitness Coaches</span>
                        </div>
                        <h2 className="section-headline text-center">Expert Fitness Trainers</h2>
                        <p className="text-zinc-500 description text-center">Meet professional fitness coaches who are dedicated to helping you achieve your fitness goals through personalized workouts and expert guidance.</p>
                    </div>
                    <div className="profiles-wrapper">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 profiles-container">
                            {coaches.map((coach, index) => (
                                <CoachCard
                                    key={index}
                                    imageSrc={coach.imageSrc}
                                    name={coach.name}
                                    nickname={coach.nickname}
                                    title={coach.title}
                                    contact={coach.contact}
                                    email={coach.email}
                                    facebook={coach.facebook}
                                    instagram={coach.instagram}
                                    tiktok={coach.tiktok}
                                    website={coach.website}
                                    otherLinks={coach.otherLinks}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

function CoachCard({ 
    imageSrc, 
    name, 
    nickname, 
    title, 
    contact, 
    email, 
    facebook, 
    instagram, 
    tiktok, 
    website, 
    otherLinks 
}: CoachCardProps) {
    return (
        <div className="h-[520px] relative overflow-hidden rounded-[10px] bg-[#080808] border border-zinc-900 profile-item group">
            {/* Coach Image */}
            <div className="h-full w-full">
                {typeof imageSrc === 'string' ? (
                    <img 
                        src={imageSrc} 
                        alt={`${name} - ${nickname}`}
                        className="grayscale group-hover:grayscale-0 transition-all duration-300 profile-image object-cover h-full w-full"
                    />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={`${name} - ${nickname}`}
                        className="grayscale group-hover:grayscale-0 transition-all duration-300 profile-image object-cover h-full w-full"
                    />
                )}
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-custom-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-overlay"></div>
            
            {/* Coach Info */}
            <div className="p-[10px] z-[2] profile-info">
                <div className="flex flex-col gap-[10px] px-[20px] rounded-[10px] profile-content">
                    <div className="flex justify-start">
                        <span className="profile-title">{nickname}</span>
                    </div>
                    <div className="pt-[10px] profile-details">
                        <div className="pl-[10px] border-l border-l-zinc-500">
                            <div className="flex flex-col pl-[10px] gap-[2px]">
                                <div className="flex flex-col gap-[8px]">
                                    <h3 className="text-[20px] leading-[15px]">{name}</h3>
                                    <span className="text-[14px] text-zinc-500">{title}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Information and Social Links */}
                        <div className="mt-[20px] flex flex-wrap gap-[10px]">
                            {contact && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={`tel:${contact}`} className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconPhone size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}

                            {email && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={`mailto:${email}`} className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconMail size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}

                            {facebook && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconBrandFacebook size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}

                            {instagram && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconBrandInstagram size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}

                            {tiktok && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={tiktok} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconBrandTiktok size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}

                            {website && (
                                <div className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
                                        <IconWorld size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            )}
                            
                            {/* Other Links */}
                            {otherLinks && otherLinks.map((link, index) => (
                                <div key={index} className="p-[5px] rounded bg-zinc-800 duration-300 hover:bg-zinc-700">
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-zinc-500 hover:text-white transition-colors duration-300"
                                    >
                                        <IconLink size={20} className="transition-transform duration-300 transform hover:scale-110" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}