import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import Spinner from 'react-bootstrap/Spinner';

/** Renders a list of all companies.
 * 
 * -state: useState to create a state variable `companies`
 * -useEffect fetches the list of companies from the API and updates `companies`
 * -props: key, handle, name, description
 * -Displays a SearchForm component that allows user to search for a company.
 * -SearchForm renders a search bar, which is passed the searchFor props to perform the search.
 * -Routed at /companies
 *
 */

function CompanyList() {
	console.debug('CompanyList');

	const [ companies, setCompanies ] = useState([]);

	/** Triggered by search form submit; reloads companies. */
	async function search(name) {
		try {
			let companies = await JoblyApi.getCompanies(name);
			setCompanies(companies);
		} catch (err) {
			console.error('Search failed:', err);
			setCompanies([]);
		}
	}

	useEffect(function getCompaniesOnMount() {
		console.debug('CompanyList useEffect getCompaniesOnMount');
		search();
	}, []);

	return (
		<div className="CompanyList col-md-8 offset-md-2">
			<SearchForm searchFor={search} />
			{companies.length ? (
				<div className="CompanyList-list">
					{companies.map(({ handle, name, description }) => (
						<CompanyCard key={handle} handle={handle} name={name} description={description} />
					))}
				</div>
			) : (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
		</div>
	);
}

export default CompanyList;
