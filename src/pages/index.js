import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import ImagePortfolio from './book-open.png'; 
import ImageContact from './email-fast.png'; 
import ImageLI from './LI-In-Bug.png'; 

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
{/*
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
*/}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div className={styles.homeText}>
          <p>I am a highly experienced Senior Technical Writer who helps software companies satisfy their unique documentation needs. Recognized as an effective communicator, I am skilled at collaborating with all levels of an organization to plan, produce, and publish technical content throughout the software development lifecycle (SDLC). I am a resourceful problem solver with a proven ability to consistently deliver quality documentation and meet challenging timelines with unwavering agility, flexibility, and reliability.</p>
          <p>My areas of expertise include the following:</p>
          <ul className={styles.bulletGrid}>
              <li>Application Programming Interface (API) References</li>
              <li>Installation & Configuration Guides</li>
              <li>End-User Documentation & Help Systems</li>
              <li>Design & Implement Documentation Strategies</li>
              <li>Documentation Project Planning & Execution</li>
              <li>MadCap Flare Consultation</li>          
          </ul>
          <div className={styles.flexContainer}>
            <Link to="/docs/intro">
              <figure>
                <img src={ImagePortfolio} alt="Portfolio" />
                <figcaption>Browse my Portfolio</figcaption>
              </figure>
            </Link>
{/*
            <figure>
              <img src={ImageContact} alt="Contact" />
              <figcaption>Contact Me</figcaption>
            </figure>
*/}
            <a href="https://www.linkedin.com/in/tompattersonTW/" target="_blank">
              <figure>
                <img src={ImageLI} alt="LinkedIn" />
                <figcaption>View my LinkedIn Profile</figcaption>
              </figure>
            </a>
          </div>
        </div>
{/*        <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
