'use client';

import Link from 'next/link';
import { Button, Separator } from '@blog/ui';
import {
  ResumeSection,
  FailuresSection,
  type Locale,
  introContent,
  socialLinks,
  workExperience,
  education,
  researchExperience,
  publications,
  talks,
  posters,
  grantsAndAwards,
  teaching,
  failedJobs,
  failedEducation,
  failedPublications,
  sectionLabels,
} from '@/components/about';
import type { Language } from '@/lib/i18n';

export interface AboutPageProps {
  /** Language for the page content */
  language?: Language;
}

/**
 * Build resume sections from data for the given locale
 */
function buildResumeSections(locale: Locale) {
  const labels = sectionLabels[locale];
  const work = workExperience[locale];
  const edu = education[locale];
  const research = researchExperience[locale];
  const awards = grantsAndAwards[locale];
  const courses = teaching[locale];

  return [
    {
      id: 'work',
      title: labels.workExperience,
      items: work.map((item) => ({
        title: item.title,
        organization: item.organization,
        dateRange: item.dateRange,
        location: item.location,
      })),
    },
    {
      id: 'education',
      title: labels.education,
      items: edu.map((item) => ({
        title: item.title,
        organization: item.organization,
        dateRange: item.dateRange,
        location: item.location,
      })),
    },
    {
      id: 'research',
      title: labels.researchExperience,
      items: research.map((item) => ({
        title: item.title,
        organization: item.organization,
        dateRange: item.dateRange,
        location: item.location,
        bullets: item.description ? [item.description] : undefined,
      })),
    },
    {
      id: 'publications',
      title: labels.publications,
      items: publications.map((pub) => ({
        title: pub,
        organization: '',
        dateRange: '',
      })),
    },
    {
      id: 'talks',
      title: labels.talks,
      items: talks.map((talk) => ({
        title: talk,
        organization: '',
        dateRange: '',
      })),
    },
    {
      id: 'posters',
      title: labels.posters,
      items: posters.map((poster) => ({
        title: poster,
        organization: '',
        dateRange: '',
      })),
    },
    {
      id: 'awards',
      title: labels.grantsAndAwards,
      items: awards.map((award) => ({
        title: award.title,
        organization: award.organization,
        dateRange: award.dateRange,
      })),
    },
    {
      id: 'teaching',
      title: labels.teaching,
      items: courses.map((course) => ({
        title: course.title,
        organization: course.organization,
        dateRange: course.dateRange,
        bullets: course.description ? [course.description] : undefined,
      })),
    },
  ];
}

/**
 * Build failures sections from data for the given locale
 */
function buildFailuresSections(locale: Locale) {
  const labels = sectionLabels[locale];
  const jobs = failedJobs[locale];
  const edu = failedEducation[locale];
  const pubs = failedPublications[locale];

  return [
    {
      id: 'jobs',
      title: labels.failedJobs,
      items: jobs.map((job) => ({
        title: job.company,
        location: job.location,
        subtitle: job.role,
        year: job.year,
        result: job.result,
      })),
    },
    {
      id: 'education',
      title: labels.failedEducation,
      items: edu.map((item) => ({
        title: item.school,
        location: item.location,
        subtitle: item.program,
        year: item.year,
        result: item.result,
      })),
    },
    {
      id: 'publications',
      title: labels.failedPublications,
      items: pubs.map((pub) => ({
        title: pub.title,
        subtitle: pub.journal
          ? `${pub.authors ? pub.authors + ' - ' : ''}${pub.journal}`
          : pub.authors,
        year: pub.year,
        result: pub.result,
      })),
    },
  ];
}

/**
 * Shared AboutPage component
 *
 * Displays the about page with intro, resume, and failures sections.
 * Used by both `/about` (English) and `/zh/about` (Chinese) routes.
 */
export function AboutPage({ language = 'en' }: AboutPageProps) {
  const locale: Locale = language;
  const basePath = language === 'zh' ? '/zh' : '';

  const intro = introContent[locale];
  const labels = sectionLabels[locale];
  const resumeSections = buildResumeSections(locale);
  const failuresSections = buildFailuresSections(locale);

  return (
    <div className="mx-auto max-w-3xl px-inset-lg py-12">
      {/* Personal intro section */}
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-6">
          {intro.title}
        </h1>
        <p className="text-body-lg leading-relaxed text-figure-secondary">
          {intro.description}
        </p>
      </header>

      <nav className="mt-6 flex gap-4">
        <Link href={`${basePath}/essays`}>
          <Button variant="primary" size="md">
            {language === 'zh' ? '阅读我的文章' : 'Read My Essays'}
          </Button>
        </Link>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="md">
            LinkedIn
          </Button>
        </a>
        <a
          href={socialLinks.googleScholar}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="md">
            Google Scholar
          </Button>
        </a>
      </nav>

      <Separator className="my-12" />

      {/* Resume section */}
      <ResumeSection
        heading={labels.resume}
        sections={resumeSections}
        defaultExpanded={['work', 'education']}
        className="mb-12"
      />

      <Separator className="my-12" />

      {/* Resume of Failures section */}
      <FailuresSection
        heading={labels.resumeOfFailures}
        intro={labels.failuresIntro}
        sections={failuresSections}
        defaultExpanded={['jobs']}
      />
    </div>
  );
}
