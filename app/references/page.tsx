import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ReferencesInfo from "@/components/Reference/ReferenceInfo";
export default async function References() {
    return (
        <main>
            <Header/>
            <div className="page-heading bg-image">
                <section className="pt-[200px] pb-[75px] page-width">
                    <div className="page-heading-wrapper uppercase">
                        <h1 className="text-white inner-page-headings">References</h1>
                    </div>
                </section>
            </div>
            <section className="bg-[#000]">
                <div className="py-[75px] page-width">
                    <ReferencesInfo/>
                </div>
            </section>
            <Footer/>
        </main>
    );
}