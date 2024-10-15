import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { defaultCssVars, TCssVars } from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [cssVars, setCssVars] = useState<TCssVars>(defaultCssVars);
	console.log(cssVars);
	return (
		<main className={clsx(styles.main)} style={cssVars as CSSProperties}>
			<ArticleParamsForm
				setCssVars={(state) => {
					setCssVars(state);
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
