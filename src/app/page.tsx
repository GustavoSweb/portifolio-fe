import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import GallerySection from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <GallerySection />
      </main>
    </>
  );
}
