import MealThumbnail from "src/components/layout/MealThumbnail";
import style from './RecepiesList.module.scss'



const RecepiesList = () => {
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
		<div className={style.recepies}>
			{DUMMY_RECEPIES.map((recepie) => (
				<MealThumbnail title={recepie.title} image={recepie.image} />
			))}
		</div>
	);
};

export default RecepiesList 
