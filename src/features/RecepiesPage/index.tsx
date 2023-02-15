import { Button } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import style from './Recepies.module.scss';
import { BsSearch } from 'react-icons/bs';
import { BsArrowDownShort } from 'react-icons/bs';

const RecepiesPage = () => {
	const DUMMY_RECEPIES = [
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
		},
		{
			title: 'chlip kulikoski',
			image:
				'https://1.bp.blogspot.com/-iVJYpygib0M/XxclcVyCbxI/AAAAAAAAX9g/xPQ8d_bfR6YauGyrYUcWWWeapF9-cEsowCLcBGAsYHQ/s1600/DSC_8856.JPG',
		},
	];
	return (
		<div className={style.content}>
			<header className={style.header}>
				<div className={style.bars}>
					<select className={style.bar} />
					<button className={style.cta_btn}>
						<BsArrowDownShort className={style.icon} />
					</button>
				</div>

				<div className={style.bars}>
					<input
						type='text'
						placeholder='szukaj...'
						className={style.bar}
					/>
					<button className={style.cta_btn}>
						<BsSearch className={style.icon} />
					</button>
				</div>
				<div className={style.add_recepie}>
					<Button className={style.btn} label='dodaj przepis' />
				</div>
			</header>
			<div className={style.recepies}>
				{DUMMY_RECEPIES.map((recepie) => (
					<MealThumbnail title={recepie.title} image={recepie.image} />
				))}
			</div>
		</div>
	);
};

export default RecepiesPage;
