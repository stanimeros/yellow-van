import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import Translator from '../../common/Translator';
import Picture from '../../common/Picture';
import MapComponent from './MapComponent';

function Section2({GlobalState}) {
  const {
		pickupDate, returnDate,
    fromDestinationID, toDestinationID,
    adults, children, infants,
		setPrice, setCategory,
    setCurrentSection, api, language,
  } = GlobalState;

	const [categories, setCategories] = useState([]);
	const [skeletonCategories, setSkeletonCategories] = useState(true);
 
	useEffect(() => { 
    const fetchCategories = async () => {
      try {
				const formData = {
					pickupDate: pickupDate,
					returnDate: returnDate,
					fromDestinationID: fromDestinationID,
					toDestinationID: toDestinationID,
					adults: adults,
					children: children,
					infants: infants,
				};

				const response = await fetch(`${api}/get_pricing.php`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

        const data = await response.json();
				if (data.status = "success"){
					setCategories(data.categories);
					setSkeletonCategories(false);
				}else{
					//error
				}

      } catch (error) {
        console.error('fetchCategories:', error);
      }
    };
  
    fetchCategories();
  }, []);

	function handleCategorySelection(title, price){
		setCategory(title);
		setPrice(price);
		setCurrentSection(3);
	}

  return (
    <>
			<div className='map'>
				<MapComponent
					GlobalState={GlobalState}
				/>
			</div>
			<div className='section section-2'>
				{skeletonCategories && (
					<>
						<div className='vehicle-category skeleton-box'>
							Vehicle Category
						</div>
					</>
				)}
				{categories.map((category, index) => (
					<div key={index} className='vehicle-category'>
						<div>
							<Picture
								image_url={category.image_url}
								width={180}
							/>
							<div className='models'>{category.models}</div>
						</div>
						<div className='left'>
							<div className='title'>
								<Translator
									language = {language}
									value={category.title}
								/>
							</div>
							<div className='info'>
								<Translator
									language = {language}
									value={`Up to ${category.passengers} passengers, ${category.suitcases} medium suitcases`}
								/>
							</div>
							<ul>
								{category.features.map((feature, index) => (
									<li key={index}>
										<Translator
											language = {language}
											value={feature}
										/>
									</li>
								))}
							</ul>
						</div>
						<div>
							<div>
								<Translator
									language = {language}
									value={returnDate == null ? `Total one way price` : `Total round trip price`}
								/>
							</div>
							{returnDate && (
								<div className='pre-price'>{`${(category.price*1.2).toFixed(2)}€`}</div>
							)}
							<div className='price'>{`${(category.price).toFixed(2)}€`}</div>
							<div className='vat'>
								<Translator
									language = {language}
									value={`Including VAT`}
								/>
							</div>
							<button onClick={() => handleCategorySelection(category.title, category.price)}>
								<Translator
									language={language}
									value={`Continue`}
								/>
							</button>
						</div>
					</div>
				))}
				<button className='back-button' onClick={() => setCurrentSection(1)}>
					<Translator
						language={language}
						value={`Back`}
					/>
				</button>
			</div>
    </>
  );
}

export default Section2;
