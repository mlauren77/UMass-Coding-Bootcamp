import React, { useState } from 'react';
import './ItemForm.css';
import axios from 'axios';

/** Renders an Item Form.
 * 
 * -Allows user to add a snack or drink item, which is added to the db and the menu.
 * -Error handling for the handleSubmit function.
 * 
 * props: setData
 * 
 */

const BASE_API_URL = 'http://localhost:5000';

const addDrinkUrl = () => `${BASE_API_URL}/drinks`;
const addSnackUrl = () => `${BASE_API_URL}/snacks`;

const SuccessMessage = () => <p style={{ color: 'green' }}>Item successfully added!</p>;

function ItemForm() {
	const [ formData, setFormData ] = useState({ item: 'snack', name: '' });
	const [ isSuccess, setIsSuccess ] = useState(false);
	const { item, name } = formData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (name === '') {
				alert('You missed some required info. Please try again.');
				return;
			}
			const data = { name };
			const url = item === 'drink' ? addDrinkUrl() : addSnackUrl();
			await axios.post(url, data);
			setIsSuccess(true);
			// clear form data after submission
			setFormData({ item: 'snack', name: '' });
		} catch (error) {
			console.error(error);
			alert('An error occurred while adding the item. Please try again.');
		}
	};

	return (
		<div className="ItemForm">
			<h2 className="h2">Add Item</h2>
			{isSuccess && <SuccessMessage />}
			<form onSubmit={handleSubmit}>
				<label className="SelectInput" htmlFor="item">
					Select:
				</label>
				<select onChange={handleChange} id="item" name="item" defaultValue={item} aria-label="Select item type">
					<option value="snack">Snack</option>
					<option value="drink">Drink</option>
				</select>

				<br />

				<label className="ItemName" htmlFor="name">
					Item Name:
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={handleChange}
					placeholder="Snack or Drink"
					required
					aria-label="Enter item name"
				/>

				<br />

				<button type="submit">Submit </button>
				<button type="reset" onClick={() => setFormData({ item: 'snack', name: '' })}>
					Reset
				</button>
			</form>
		</div>
	);
}

export default ItemForm;
