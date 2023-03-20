import React, { Dispatch, SetStateAction } from 'react';
import ReactSelect from 'react-select';

import { Loader } from 'components';
import InputWrapper, {
	getWrapperProps,
	InnerWrapperProps,
} from 'components/layout/InputWrapper';

import { selectStyles } from './styles';

type OptionType = {
	label: string;
	value: string | number;
};

interface SelectProps extends InnerWrapperProps {
	options: any;
	value: OptionType | null;
	onChange: (x: {
		value: string;
		label: string;
	}) => void | Dispatch<
		SetStateAction<{ value: string; label: string } | null>
	>;
	wrapperStyle?: string;
	noOptionsMessage?: string;
	isLoading?: boolean;
	placeholder?: string;
	defaultFirstValue?: boolean;
	isSearchable?: boolean;
	icon?: string;
	closeMenuOnSelect?: boolean;
	showValue?: boolean;
	isClearable?: boolean;
}

const Select = (props: SelectProps) => {
	const {
		wrapperStyle,
		noOptionsMessage = 'Brak wyników',
		isLoading,
		placeholder = 'Wybierz...',
		options,
		isSearchable = false,
		value,
		onChange,
		showValue = true,
		closeMenuOnSelect = true,
		isClearable = false,
	} = props;
	const wrapperProps = getWrapperProps(props);

	return (
		<InputWrapper {...wrapperProps}>
			<div className={wrapperStyle}>
				<ReactSelect
					placeholder={placeholder}
					menuPlacement={'auto'}
					onChange={onChange as any}
					styles={selectStyles(!!wrapperProps.errorMessage)}
					loadingMessage={() => <Loader center />}
					noOptionsMessage={() =>
						isLoading ? <Loader center /> : noOptionsMessage
					}
					options={options}
					value={value}
					controlShouldRenderValue={showValue}
					isSearchable={isSearchable}
					closeMenuOnSelect={closeMenuOnSelect}
					isClearable={isClearable}
				/>
			</div>
		</InputWrapper>
	);
};

export default Select;
