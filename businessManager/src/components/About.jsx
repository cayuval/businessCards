import { useContext, useEffect } from "react";
import ShowMobileNavContext from "../contexts/showMobileNavContext";
import Footer from "./Footer";


export default function About() {
    //when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)

    //when we open the page on mobile - close the navbar
    useEffect(() => {
        setShowMobileNav(false)
    }, [])

    //simple about content
    return (<>
        <h1>This is a business Manger Site, designed to help you with everything you need</h1>
        <p style={{
            marginRight: '15px', marginLeft: '15px'
        }}>Welcome to search business website, the ultimate online resource for your business needs! Here you'll find all the tools and information necessary to start and grow your business. From finding potential investors, suppliers, or customers to marketing your business and understanding legal obligations, we've got you covered. Our experienced team is dedicated to providing top-notch resources that will help take your business to the next level. With our easy-to-use search features and detailed product descriptions, it's never been easier to find what you need. Let us help you reach success with our powerful solutions.
        </p><p>
            Are you looking for a website that helps you to find the perfect business? Look no further than search business website. We offer an intuitive search experience, with tailored results and advanced filters that help you quickly and easily identify the businesses you need. Whether you’re seeking a small boutique, local start-up, or large corporate conglomerate – our modern search engine has got you covered! Get started today and explore what the world of business has to offer.
        </p>
        <p>At  Business manager Website, we believe that searching for the right business online should be quick and easy. Our modern website is designed to make finding the perfect company simple. With an intuitive layout and advanced search options, you can find businesses that meet your exact needs. We have an extensive directory of trusted companies that span across a variety of industries and offer the best in products, services, and solutions. Get started today by searching for the perfect business to match your needs!</p>
        <p>
            Find the perfect match for your business


            Are you looking to build a modern, search-friendly website for your business? Look no further than Search Business Website. Our innovative technology allows businesses to get online quickly and efficiently, making it easier than ever to create a dynamic web presence that caters to their needs. With easy customization options and an intuitive user interface, we can help make sure your site looks great, is optimized for search engines, and fits within any budget. Try our service today and find out why more businesses are turning to Search Business Website.

        </p>

    </>)
}