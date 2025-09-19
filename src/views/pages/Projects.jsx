import Default from '../components/layouts/Default';
import Heading from '../components/customs/Heading';
import { projects } from '../../data/projects';

export default function Projects() {
    return (
        <Default>
            <p>
                Here you can take a look at some of the projects I do in my
                spare time. For <b>all</b> of the projects that I have sole
                ownership over,{' '}
                <a href="https://github.com/Clement-Zhang?tab=repositories">
                    click here
                </a>
                .
            </p>
            <p>
                I have contributed to many other projects, but I am not listing
                them here due to lack of group permission.
            </p>
            {projects.map((project) => (
                <div key={project.name}>
                    <Heading>
                        <a
                            href={project.link}
                            className="text-blue-600 visited:text-purple-600 hover:underline hover:text-blue-800"
                        >
                            {project.name}
                        </a>
                    </Heading>
                    <img
                        src={project.img}
                        alt={project.alt}
                        className="m-auto block w-1/4 h-1/4"
                    />
                    <p>{project.description}</p>
                </div>
            ))}
        </Default>
    );
}
