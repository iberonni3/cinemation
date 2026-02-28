// Cinemation — Project Data
export interface Project {
    id: string;
    title: string;
    subtitle: string;
    year: string;
    category: string;
    description: string;
    videoSrc: string;
    accentColor: string;
}

export const projects: Project[] = [
    {
        id: 'obsidian',
        title: 'OBSIDIAN',
        subtitle: 'Brand Film',
        year: '2024',
        category: 'Campaign · Luxury',
        description:
            'A study in contrast. Obsidian explores identity through shadow and silence, crafted for a luxury residential brand.',
        // Public domain cinematic b-roll via Pexels
        videoSrc: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
        accentColor: 'rgba(139, 26, 26, 0.3)',
    },
    {
        id: 'nocturne',
        title: 'NOCTURNE',
        subtitle: 'Fashion Editorial',
        year: '2024',
        category: 'Editorial · Fashion',
        description:
            'When darkness becomes texture. Nocturne reframes night as a canvas for precision and emotion in equal measure.',
        videoSrc: 'https://videos.pexels.com/video-files/4482900/4482900-uhd_2560_1440_30fps.mp4',
        accentColor: 'rgba(201, 169, 110, 0.2)',
    },
    {
        id: 'eclipse',
        title: 'ECLIPSE',
        subtitle: 'Automotive Campaign',
        year: '2023',
        category: 'Campaign · Automotive',
        description:
            'Speed rendered still. Eclipse documents the vanishing point between momentum and stillness for an iconic marque.',
        videoSrc: 'https://videos.pexels.com/video-files/2792369/2792369-uhd_2560_1440_30fps.mp4',
        accentColor: 'rgba(240, 237, 232, 0.08)',
    },
];
