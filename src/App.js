import React, { useEffect, useState } from 'react';
//router
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
//redux
import { useDispatch } from 'react-redux';
import { Creators as DataActions } from './actions/data-action';
//
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import RoutePublic from './components/RoutePublic';

import Home from './routes/Home';
import DataList from './routes/DataList';
import AreaChart from './routes/AreaChart';
import TreeMap from './routes/TreeMap';
import NotFound from './routes/NotFound';
import Splash from './routes/Splash';

import config from './config';

//data
import SumBalance from './data/SumBalance.csv';
import PartnerYear from './data/Export_import_partner_year.csv';
import Percent_Product from './data/Percent.csv';
//lib
import { countries } from 'country-data';
import _ from 'lodash';
import getCountryISO2 from 'country-iso-3-to-2';
const Main = styled.main`
  min-height: 100vh;
`;

const MyRouter = () => {
	return (
		<Router history={history}>
			<Helmet
				defer={false}
				htmlAttributes={{ lang: 'pt-br' }}
				encodeSpecialCharacters={true}
				defaultTitle={config.name}
				titleTemplate={`%s | ${config.name}`}
				titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
			/>
			<Main isAuthenticated={false}>
				<Switch>
					<RoutePublic
						isAuthenticated={false}
						path="/"
						exact
						component={DataList}
					/>
					<RoutePublic
						isAuthenticated={false}
						path="/data"
						exact
						component={DataList}
					/>
					<RoutePublic
						isAuthenticated={false}
						path="/map"
						exact
						component={Home}
					/>
					<RoutePublic
						isAuthenticated={false}
						path="/area-chart"
						component={AreaChart}
					/>
					<RoutePublic
						isAuthenticated={false}
						path="/tree-map"
						component={TreeMap}
					/>
					<Route component={NotFound} />
				</Switch>
			</Main>
		</Router>
	);
}

const App = () => {
	/* #region  props redux store */
	const dispatch = useDispatch();
	const [balance_ready, setBalanceReady] = useState(false);
	const [partner_ready, setPartnerReady] = useState(false);
	const [percent_ready, setPercentReady] = useState(false);
	/* #endregion */

	const loadSumBalance = () => {
		if (window.Worker) {
			const wk = new Worker('worker.js');
			wk.addEventListener('message', event => {
				const data = event.data.map((item, index) => {
					const { location_code, Tong_Export, Tong_Import, Balance, year } = item;
					item.key = index;
					item.location_name = _.isEmpty(countries[location_code]) ? 'Không xác định' : countries[location_code].name;
					item.country_code_iso2 = getCountryISO2(location_code);
					item.country_code_iso3 = location_code;
					item.Tong_Export = Number(Tong_Export);
					item.Tong_Import = Number(Tong_Import);
					item.Balance = Number(Balance);
					item.year = Number(year);
					return item;
				})
				dispatch(DataActions.setSumBalanceData({ data }));
				setBalanceReady(true);
			});
			wk.postMessage({ file: SumBalance })
		}
	}

	const loadPartnerYear = () => {
		if (window.Worker) {
			const wk = new Worker('worker.js');
			wk.addEventListener('message', event => {
				const data = event.data.map((item, index) => {
					const { location_code, partner_code, Tong_Export, Tong_Import, year } = item;
					item.key = index;
					item.location_name = _.isEmpty(countries[location_code]) ? 'Không xác định' : countries[location_code].name;
					item.country_code_iso2 = getCountryISO2(location_code);
					item.country_code_iso3 = location_code;
					item.partner_code_ios2 = getCountryISO2(partner_code);
					item.partner_code_iso3 = partner_code;
					item.Tong_Export = Number(Tong_Export);
					item.Tong_Import = Number(Tong_Import);
					item.year = Number(year);
					return item;
				})
				dispatch(DataActions.setPartnerYearData({ data }));
				setPartnerReady(true);
			});
			wk.postMessage({ file: PartnerYear })
		}
	}

	const loadPercentProduct = () => {
		if (window.Worker) {
			const wk = new Worker('worker.js');
			wk.addEventListener('message', event => {
				const data = event.data.map((item, index) => {
					const { year, location_code, Session_code, Session_name, product_id, SumImport, PercentIm, SumExport, PercentEx, Percent_Session_Im, Percent_Session_Ex } = item;
					item.key = index;
					item.location_name = _.isEmpty(countries[location_code]) ? 'Không xác định' : countries[location_code].name;
					item.country_code_iso2 = getCountryISO2(location_code);
					item.country_code_iso3 = location_code;
					item.SumExport = Number(SumExport);
					item.SumImport = Number(SumImport);
					item.PercentIm = Number(PercentIm);
					item.PercentEx = Number(PercentEx);
					item.Percent_Session_Im = Number(Percent_Session_Im);
					item.Percent_Session_Ex = Number(Percent_Session_Ex);
					item.Session_name = Session_name;
					item.product_id = product_id;
					item.Session_code = Number(Session_code);
					item.year = Number(year);
					return item;
				})
				dispatch(DataActions.setPercentProductData({ data }));
				setPercentReady(true);
			});
			wk.postMessage({ file: Percent_Product })
		}
	}

	useEffect(() => {
		!balance_ready && loadSumBalance();
		!partner_ready && loadPartnerYear();
		!percent_ready && loadPercentProduct();
		return () => { }
	}, [])

	return (
		balance_ready && partner_ready && percent_ready ? <MyRouter /> : <Splash />
	)
}

export default App;