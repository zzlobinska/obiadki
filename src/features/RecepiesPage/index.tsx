import { Button } from 'src/components';
import style from './Recepies.module.scss';

const DUMMY_RECEPIES = {
    title: 'nalesniki',
    image: 'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx'
}

const RecepiesPage = () => {
	return (
		<div>
			<header>
				<div>
					<select />
				</div>
				<div>
					<input />
				</div>
				<div>
					<Button />
				</div>
			</header>
            <div></div>
		</div>
	);
};

export default RecepiesPage;
