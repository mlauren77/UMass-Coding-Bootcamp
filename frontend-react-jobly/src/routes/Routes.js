import React from 'react';
import { Route, Routes, Switch, Navigate } from 'react-router-dom';

import Home from '../Components/Home';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobsList from '../jobs/JobsList';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Profile from '../Components/Profile';

/** Routing Logic. */

const AppRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/companies" element={<CompanyList />} />
			<Route exact path="/companies/:handle" element={<CompanyDetail />} />
			<Route exact path="/jobs" element={<JobsList />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default AppRoutes;
