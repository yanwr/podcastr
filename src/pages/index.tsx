import { GetStaticProps } from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import { convertDurationToTimeString } from '../utils';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  duration: number;
  durationFormated: string;
};
type HomeProps = {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {

  function renderLatestEpisodes() {
    return latestEpisodes.map((episode, index) => (
      <li key={index}>
        <Image
          width={192}
          height={192}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover"
        />

        <div className={styles.detailsContent}>
          <Link href={`/episode/${episode.id}`}>
            <a>{episode.title}</a>
          </Link>
          <p>{episode.members}</p>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationFormated}</span>
        </div>

        <button type="button">
          <img src="/play-green.svg" alt="Play episode" />
        </button>
      </li>
    ));
  }

  function renderAllEpisodes() {
    return allEpisodes.map((episode, index) => (
      <tr key={index}>
        <td style={{ width: 72 }}>
          <Image
            width={120}
            height={120}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />
        </td>
        <td>
          <Link href={`/episode/${episode.id}`}>
            <a>{episode.title}</a>
          </Link>
        </td>
        <td>{episode.members}</td>
        <td style={{ width: 100 }}>{episode.publishedAt}</td>
        <td>{episode.durationFormated}</td>
        <td>
          <button type="button">
            <img src="/play-green.svg" alt="Play episode" />
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <div className={styles.container} >
      <section className={styles.latestEpisodesContainer}>
        <h2>Last releases</h2>
        <ul>
          {renderLatestEpisodes()}
        </ul>
      </section>

      <section className={styles.allEpisodesContainer}>
        <h2>All episodes</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcats</th>
              <th>Members</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderAllEpisodes()}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("/episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc"
    }
  });

  const episodes = response.data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationFormated: convertDurationToTimeString(Number(episode.file.duration)),
      publishedAt: format(parseISO(episode.published_at), "d MMM yy"),
    }
  });

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2, episodes.length)
    },
    revalidate: 60 * 60 // 1h
  }
}