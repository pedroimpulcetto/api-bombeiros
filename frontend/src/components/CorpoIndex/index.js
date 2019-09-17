import React, { Component } from 'react';
import api from '../../services/api.js';
import ModalDeletar from '../Modal/Deletar/modal.js';
import ModalTalao from '../Modal/Talao/modal.js';
import axios from 'axios';
import Navigation from '../Menu/index.js';

export default class CorpoIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: {
				num_talao: '',
				data_talao: '',
				hora_chamada_talao: '',
				solicitante_talao: '',
				tel_talao: '',
				endereco_talao: '',
				num_end_talao: '',
				bairro_talao: '',
				atendente_talao: '',
				tipo_ocor_talao: '',
				cod_talao: '',
				viatura_talao: '',
				hs_talao: '',
				os_talao: '',
				hl_talao: '',
				ol_talao: '',
				sl_talao: '',
				ps_talao: '',
				sps_talao: '',
				hpb_talao: '',
				opb_talao: '',
				num_vit_talao: '',
				qru_talao: '',
				motorista_talao: '',
				comandante_talao: ''
			},
			talao: [],
			numerador: 0
		};
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = async () => {
		const response = await api.get('talao/');
		this.setState({ talao: response.data.results });
	};

	// funcao para dar refresh a cada nova interacao com a API
	refreshList = () => {
		axios.get('http://localhost:8000/api/talao').then((res) => this.setState({ talao: res.data.results }));
	};

	// renderizando as linhas da tabela
	// item a item
	renderItems = () => {
		const newItems = this.state.talao;
		return newItems.map((talao) => (
			<tr key={talao.id}>
				<th scope="row">{(this.state.numerador += 1)}</th>
				<td>{talao.data_talao}</td>
				<td>{talao.num_talao}</td>
				<td>
					{talao.endereco_talao}, {talao.num_end_talao} - {talao.bairro_talao}
				</td>
				<td>{talao.tipo_ocor_talao}</td>
				<td>{talao.viatura_talao}</td>
				<td>{talao.os_talao}</td>
				<td>{talao.ol_talao}</td>
				<td>{talao.opb_talao}</td>
				<td>
					<div className="btn-group btn-group-sm" role="group" aria-label="botoes">
						{/* botao editar dentro da linha */}
						<button onClick={() => this.editItem(talao)} className="btn btn-outline-warning mr-2">
							Edit
						</button>

						{/* botao deletar dentro da linha */}
						<button onClick={() => this.deleteItem(talao)} className="btn btn-outline-danger">
							Del
						</button>
					</div>
				</td>
			</tr>
		));
	};

	// acao para acionar o Modal
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};

	// acao para acionar o Modal de confirmacao para deletar
	toggleDeletar = () => {
		this.setState({ modalDeletar: !this.state.modalDeletar });
	};

	// funcao DELETAR
	// passa como parametro o id que queremos deletar
	handleDelete = (talao) => {
		this.toggleDeletar();
		axios.delete(`http://localhost:8000/api/talao/${talao.id}/`).then((res) => this.refreshList());
	};

	// funcao ADICIONAR e EDITAR
	handleSubmit = (talao) => {
		this.toggle();
		// SE for editar, passa como parametro o id que queremos editar + as informacoes ja preenchidas
		if (talao.id) {
			axios.put(`http://localhost:8000/api/talao/${talao.id}/`, talao).then((res) => this.refreshList());
			return;
		}
		// SE NAO, adicionamos um item novo
		axios.post('http://localhost:8000/api/talao/', talao).then((res) => this.refreshList());
		return;
	};

	// CHAMA O MODAL PARA ADICIONARMOS UM ITEM
	// esta no botao adicionar
	createItem = () => {
		const talao = {
			num_talao: '',
			data_talao: '',
			hora_chamada_talao: '',
			solicitante_talao: '',
			tel_talao: '',
			endereco_talao: '',
			num_end_talao: '',
			bairro_talao: '',
			atendente_talao: '',
			tipo_ocor_talao: '',
			cod_talao: '',
			viatura_talao: '',
			hs_talao: '',
			os_talao: '',
			hl_talao: '',
			ol_talao: '',
			sl_talao: '',
			ps_talao: '',
			sps_talao: '',
			hpb_talao: '',
			opb_talao: '',
			num_vit_talao: '',
			qru_talao: '',
			motorista_talao: '',
			comandante_talao: ''
		};
		this.setState({ activeItem: talao, modal: !this.state.modal });
	};

	// CHAMA O MODAL PARA EDITARMOS UM ITEM
	// esta no botao editar
	editItem = (talao) => {
		this.setState({ activeItem: talao, modal: !this.state.modal });
	};

	// CHAMA O MODAL DE CONFIRMACAO PARA EXCLUSAO
	// esta no botao deletar
	deleteItem = (talao) => {
		this.setState({ activeItem: talao, modalDeletar: !this.state.modalDeletar });
	};

	render() {
		return (
			<main>
				<div id="principal-index" className="">
					<div id="corpo-index" className="body card">
						<br />
						<table className="table table-hover">
							<thead className="thead-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Data</th>
									<th scope="col">Talão</th>
									<th scope="col">Endereço</th>
									<th scope="col">Tipo de Ocor.</th>
									<th scope="col">Viatura</th>
									<th scope="col">Odo. Saída</th>
									<th scope="col">Odo. Local</th>
									<th scope="col">Odo. Final</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>{this.renderItems()}</tbody>
						</table>
						<div id="footer-talao" className="card-footer" />
					</div>
				</div>
				{/* DECLARANDO O MODAL ADICIONAR E EDITAR */}
				{this.state.modal ? (
					<ModalTalao activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
				) : null}

				{/* DECLARANDO O MODAL DELETAR */}
				{this.state.modalDeletar ? (
					<ModalDeletar
						activeItem={this.state.activeItem}
						toggleDeletar={this.toggleDeletar}
						onSave={this.handleDelete}
					/>
				) : null}
			</main>
		);
	}
}
