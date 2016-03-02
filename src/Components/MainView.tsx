import * as React from 'react';
import {ViewContextStackItem} from '../AppContext/ViewManager';
import ViewContextStoreGroup from '../ViewContext/ViewContext';
import HomeTimelineStoreGroup, {isHomeTimelineStoreGroup} from '../ViewContext/HomeTimeline';
import ActionCreator, {ViewType} from '../AppContext/ActionCreator';

import HomeTimeline from './HomeTimeline';
// import UserTimeline from './UserTimeline';
// import ListTimeline from './ListTimeline';
// import SearchTimeline from './SearchTimeline';

const debug = require('remote').require('debug')('Components:MainView');

interface Props {
    actions: ActionCreator;
    stores: ViewContextStackItem;
};

type States = {};

export default class MainView extends React.Component<Props, States> {
    renderWrapper(view: JSX.Element) {
        return (
            <section id='mainView'>
                {view}
            </section>
        );
    }

    render() {
        debug('MainView#render');
        let view: any = null;
        const top = this.props.stores;

        switch (top.type) {
            case ViewType.HomeTimeline: {
                return this.renderWrapper(
                    <HomeTimeline
                        source_id={top.source_id}
                        store={top.store}
                        actions={top.actions}
                        appActions={this.props.actions}
                        />
                );
            };
            // case ViewType.UserTimeline: {
            //   view = <UserTimeline
            //     source_id={top.source_id}
            //     target_id={top.target_id}
            //     store={top.store}
            //     actions={top.actions}
            //     appActions={this.props.actions}
            //   />;
            // } break;
            // case ViewType.ListTimeline: {
            //   view = <ListTimeline
            //     source_id={top.source_id}
            //     target_id={top.target_id}
            //     store={top.store}
            //     actions={top.actions}
            //     appActions={this.props.actions}
            //   />;
            // } break;
            // case ViewType.SearchTimeline: {
            //   view = <SearchTimeline
            //     source_id={top.source_id}
            //     query={top.query}
            //     store={top.store}
            //     actions={top.actions}
            //     appActions={this.props.actions}
            //   />;
            // } break;
        }
    }
}
