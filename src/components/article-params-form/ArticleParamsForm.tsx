import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultCssVars,
	TCssVars,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export const ArticleParamsForm: React.FC<{
	setCssVars: (state: TCssVars) => void;
}> = ({ setCssVars }) => {
	const [stateFormOpen, setStateFormOpen] = useState(false);
	const [stateFontFamily, setStateFontFamily] = useState(fontFamilyOptions[0]);
	const [stateFontSize, setStateFontSize] = useState(fontSizeOptions[0]);
	const [stateFontColor, setStateFontColor] = useState(fontColors[0]);
	const [stateBackgroundColor, setStateBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [stateContentWidth, setStateContentWidth] = useState(
		contentWidthArr[0]
	);

	const cssVars = {
		'--font-family': stateFontFamily.value,
		'--font-size': stateFontSize.value,
		'--font-color': stateFontColor.value,
		'--container-width': stateContentWidth.value,
		'--bg-color': stateBackgroundColor.value,
	};

	const formStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: stateFormOpen,
	});

	const toggleButtonState = (state: boolean): boolean => {
		return state === false;
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: stateFormOpen,
		rootRef,
		onChange: setStateFormOpen,
		onClose: () => {},
	});

	return (
		<>
			<ArrowButton
				isOpen={stateFormOpen}
				onClick={() => {
					setStateFormOpen(toggleButtonState(stateFormOpen));
				}}
			/>
			<aside className={formStyle} ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCssVars(cssVars);
					}}
					onReset={(e) => {
						e.preventDefault();
						setCssVars(defaultCssVars);
					}}>
					<Text uppercase={true} size={31} weight={800}>
						{'Задайте параметры'}
					</Text>

					<Select
						title='шрифт'
						selected={stateFontFamily}
						options={fontFamilyOptions}
						onChange={setStateFontFamily}
					/>

					<RadioGroup
						title='размер шрифта'
						selected={stateFontSize}
						options={fontSizeOptions}
						name='radio'
						onChange={setStateFontSize}
					/>

					<Select
						title='цвет шрифта'
						selected={stateFontColor}
						options={fontColors}
						onChange={setStateFontColor}
					/>

					<Separator />

					<Select
						title='цвет фона'
						selected={stateBackgroundColor}
						options={backgroundColors}
						onChange={setStateBackgroundColor}
					/>

					<Select
						title='ширина контента'
						selected={stateContentWidth}
						options={contentWidthArr}
						onChange={setStateContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
