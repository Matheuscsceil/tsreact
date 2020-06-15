import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Repository } from '../../store/ducks/repositories/types';
import { ApplicationState } from '../../store';
import * as RepositoriesActions from '../../store/ducks/repositories/actions';

import RepositoryItem from '../RepositoryItem';

interface State {
    newRepository ?: string;
}

interface StateProps {
    repositories: Repository[];
}

interface DispatchProps {
    loadRequest(): void;
    loadSuccess(data: Repository[]): void;
}

type Props = StateProps & DispatchProps;

class RepositoryList extends Component<Props, State> {
    state = {
      newRepository: '',
    }

    componentDidMount() {
      const { loadRequest } = this.props;
      loadRequest();
    }

    render() {
      const { repositories } = this.props;
      const { newRepository } = this.state;

      return (
        <div>
          <h1>{newRepository}</h1>
          <ul>
            {repositories.map((repository) => <RepositoryItem key={repository.id} repository={repository} />)}
          </ul>
        </div>
      );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
  repositories: state.repositories.data,
});

const mapDispatchToPros = (dispatch: Dispatch) => bindActionCreators(RepositoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToPros)(RepositoryList);
