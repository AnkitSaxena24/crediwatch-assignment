import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class MatchesChart extends Component {

	render() {
		const { formatted_data } = this.props;

		let final_data = [];

		if(Object.keys(formatted_data).length > 0) {
			Object.keys(formatted_data).map((data, index) => {
				data = formatted_data[data];

				if(data['code'] && data['code'] !== ''){
					final_data.push(
						<TableRow key={index}>
		                    <TableCell align="center">{data['code']}</TableCell>
		                    <TableCell align="center">{data['total_matches']}</TableCell>
		                    <TableCell align="center">{data['total_win']}</TableCell>
		                    <TableCell align="center">{data['total_loss']}</TableCell>
		                    <TableCell align="center">{data['total_tie']}</TableCell>
		                    <TableCell align="center">{data['own_score']}</TableCell>
		                    <TableCell align="center">{data['against_score']}</TableCell>
		                </TableRow>
					)
				}
			});
		}

		return(
			<div className="row">
				<div className="col-md-12 text-center">
					<Paper style={{width: '1000px', margin: '0 auto'}}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Teams</TableCell>
									<TableCell align="center">Total Matches</TableCell>
									<TableCell align="center">Won</TableCell>
									<TableCell align="center">Lost</TableCell>
									<TableCell align="center">Ties</TableCell>
									<TableCell align="center">Total Goals Scored For</TableCell>
									<TableCell align="center">Total Goals Scored Against</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{final_data}
							</TableBody>
						</Table>
					</Paper>
				</div>
			</div>
		);
	}
}

export default MatchesChart;