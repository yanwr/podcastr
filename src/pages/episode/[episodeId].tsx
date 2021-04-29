import { parseISO, format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils';
import Image from 'next/image';
import styles from './episode.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  duration: number;
  durationFormated: string;
  description: string;
};
type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {

  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <button type="button">
          <img src="/arrow-left.svg" alt="Back" />
        </button>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Play episode" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationFormated}</span>
      </header>

      <div className={styles.descriptionContent} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await api.get(`/episodes/${context.params.episodeId}`);

  return {
    props: {
      episode: {
        id: response.data.id,
        title: response.data.title,
        members: response.data.members,
        thumbnail: response.data.thumbnail,
        url: response.data.file.url,
        duration: Number(response.data.file.duration),
        durationFormated: convertDurationToTimeString(Number(response.data.file.duration)),
        publishedAt: format(parseISO(response.data.published_at), "d MMM yy"),
        description: response.data.description
      }
    },
    revalidate: 60 * 60 * 24 * 30 // 1 mes
  }
}