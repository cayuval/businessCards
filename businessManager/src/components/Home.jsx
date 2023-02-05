import { useEffect } from "react";
import { useContext } from "react";
import ShowMobileNavContext from "../contexts/showMobileNavContext";
import Footer from "./Footer";
import Loader from "./Loader";

export default function Home() {
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)
    useEffect(() => {
        setShowMobileNav(false)
    }, [])
    //simple home info
    return (<>
        <h1>Hello</h1>

        <div className="HomeContent">

            <p>Welcome to Search Business, the one-stop shop for all your search business needs! We have an array of modern solutions that can help you get the results you’re looking for in a timely manner. Get started today with our easy-to-use tools, designed with a modern tone that allows you to quickly implement new strategies. So don't wait - explore Search Business now and start optimizing your website for success!</p>
            <p>
                Find the Right Solution for Your Business


                Are you looking for a search business website that can help your business find the right solutions? We have the perfect tool for you. With our cutting-edge search technology, you can access an expansive range of resources to get the answers you need quickly and easily.


                We understand how valuable time is in today’s fast-paced world, so we’ve made it simple to locate information related to any type of industry or field. With our modern search capabilities, you’ll be able to save time and money by pinpointing what matters most – the solutions that fit your specific needs.


                Our streamlined search platform helps your business stay competitive and productive by giving you instant access to market trends.


                The ultimate goal is to empower businesses of all sizes with comprehensive solutions to everyday challenges. That’s why we offer free consultations so you can ask questions and learn more about our products and services before committing to a purchase.


                With us at your side, finding the right solution is easier than ever before!

            </p>

            <p>Connect with modern businesses that are perfect for you! With Search business website. With comprehensive listings, and up-to-date information about business products and services, Search business website is your go-to destination for finding exactly what you need in the world of business. Make informed decisions and stay ahead of the competition with the latest resources available on Search business website.</p>

            <p>But can YOU post your business? Of - course!, here at business manager website we allow everyone to upload their business information so every business, from small paper company - to a huge brand like office depo. and all of that - 100% free!
            </p>
            <p> If you are looking for a business for your company, sign up as a client acount. <br />But if you would like to also increase your sales by uploading your own business card, sign up as a business account.  </p>
            <p>We hope you find our website nothing less then the best tool for your business needs!</p>
        </div>
    </>)
}