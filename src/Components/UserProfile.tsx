import * as React from 'react';

import ActionCreator, {ViewType} from '../AppContext/ActionCreator';
import {default as UserProfileStoreGroup} from '../ViewContext/StoreGroups/UserProfile';

import {getProfileImage} from '../util';

const debug = require('remote').require('debug')('Components:UserProfile');
const classBuilder = require('bemmer').create('user_profile');

interface Props {
    id: string;
    appActions: ActionCreator;
    store: UserProfileStoreGroup;
};

type States = {};

export default class UserProfile extends React.Component<Props, States> {
    remover: Function;
    removerOnUnload: Function;

    bindedForceUpdate = this.forceUpdate.bind(this);

    _listenChange() {
        this.remover = this.props.store.onChange(this.bindedForceUpdate);

        window.addEventListener('beforeunload', this.bindedUnlistenChange);
        this.removerOnUnload = window.removeEventListener.bind(window, 'beforeunload', this.bindedUnlistenChange);
    }

    _unlistenChange() {
        this.remover();
        this.removerOnUnload();
    }
    bindedUnlistenChange = this._unlistenChange.bind(this);

    componentDidMount() {
        this._listenChange();
    }

    componentWillUnmount() {
        this._unlistenChange();
    }

    imageSource(user: any) {
        // TODO size reduction, preload image...
        return `${user.profile_banner_url}/1500x500`;
    }

    __openUserTimeline() {
        const state = this.props.store.getState();
        this.props.appActions.pushStack({
            type: ViewType.UserTimeline,
            source_id: state.type.source_id,
            target_id: state.user.id_str,
        });
    }
    _openUserTimeline = this.__openUserTimeline.bind(this);

    render() {
        debug('UserProfile#render');
        const state = this.props.store.getState();
        const user = state.user;

        if (user) return (
            <section id={this.props.id} className={classBuilder() }>
                <section className={classBuilder('__wrapper') }>
                    <section className={classBuilder('__header') }>
                        <section className={classBuilder('__header__header') }>
                            <img src={getProfileImage(user.profile_image_url, '') } className={classBuilder('__header__avatar') }></img>
                            <section className={classBuilder('__header__content') }>
                                <p>{`@${user.screen_name}`}</p>
                                <p>{user.name}</p>
                                <p>{user.location}</p>
                                <p>{user.url}</p>
                            </section>
                        </section>
                        <section className={classBuilder('__header__description') }>
                            {user.description}
                        </section>
                    </section>
                    <section className={classBuilder('__ribbon') }>
                        <div className={classBuilder('__ribbon__item', { statuses: true }) } onClick={this._openUserTimeline}>
                            <span className={classBuilder('__ribbon__item__value') }>
                                {user.statuses_count}
                            </span>
                        </div>
                        <div className={classBuilder('__ribbon__item', { followees: true }) }>
                            <span className={classBuilder('__ribbon__item__value') }>
                                {user.friends_count}
                            </span>
                        </div>
                        <div className={classBuilder('__ribbon__item', { followers: true }) }>
                            <span className={classBuilder('__ribbon__item__value') }>
                                {user.followers_count}
                            </span>
                        </div>
                        <div className={classBuilder('__ribbon__item', { favorites: true }) }>
                            <span className={classBuilder('__ribbon__item__value') }>
                                {user.favourites_count}
                            </span>
                        </div>
                    </section>
                </section>
            </section>
        );

        return (
            <section id={this.props.id}>
                <p>loading...</p>
            </section>
        );
    }
}
