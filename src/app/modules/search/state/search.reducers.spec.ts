import { initialState, reducer } from './search.reducers';
import * as actions from './search.actions';
import videos from '../../../tests/fixtures/videos';
import response from '../../../tests/fixtures/response';

describe('SearchReducer', () => {

  it('should be return initialState when state undefined', () => {
    expect(reducer(undefined, {type: 'undefined'})).toEqual(initialState);
  });

  it('should be return state when action undefined', () => {
    const state = {...initialState, loading: false};
    expect(reducer(state, {type: 'undefined'})).toEqual(state);
  });

  describe('UpdateQuery', () => {
    it('update query', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.UpdateQuery({query: 'test'}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: 'test',
          limit: 50,
        },
      });
    });

    it('update nextPage', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      }, actions.UpdateQuery({query: 'test'}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: 'test',
          limit: 30,
        },
      });
    });

    it('update items', () => {
      expect(reducer({
        items: videos,
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      }, actions.UpdateQuery({query: 'test'}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: 'test',
          limit: 30,
        },
      });
    });
  });

  describe('SearchVideosLoading', () => {
    it('keep loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.SearchVideosLoading({query: null, limit: 50}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });

    it('update loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      }, actions.SearchVideosLoading({query: null, limit: 50}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      });
    });
  });

  describe('SearchVideosComplete', () => {
    it('empty state', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.SearchVideosComplete({response}))).toEqual({
        items: videos,
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 50,
        },
      });
    });

    it('update state', () => {
      expect(reducer({
        items: videos,
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CAoQAQ',
          query: null,
          limit: 30,
        },
      }, actions.SearchVideosComplete({response}))).toEqual({
        items: [...videos, ...videos],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      });
    });
  });

  describe('SearchVideosCompleteLastPage', () => {
    it('keep loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.SearchVideosCompleteLastPage())).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });

    it('update loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      }, actions.SearchVideosCompleteLastPage())).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      });
    });
  });

  describe('SearchVideosFailed', () => {
    it('keep loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.SearchVideosFailed({error: new Error()}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });

    it('update loading', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      }, actions.SearchVideosFailed({error: new Error()}))).toEqual({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: false,
        navigation: {
          nextPage: 'CBQQAA',
          query: null,
          limit: 30,
        },
      });
    });
  });

  describe('ToggleFavourites', () => {
    it('empty state', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [],
          items: {},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.ToggleFavourites({item: videos[1]}))).toEqual({
        items: [],
        favourites: {
          selected: [videos[1].id.videoId],
          items: {[videos[1].id.videoId]: videos[1]},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });

    it('update state', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [videos[0].id.videoId],
          items: {[videos[0].id.videoId]: videos[0]},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.ToggleFavourites({item: videos[2]}))).toEqual({
        items: [],
        favourites: {
          selected: [videos[0].id.videoId, videos[2].id.videoId],
          items: {[videos[0].id.videoId]: videos[0], [videos[2].id.videoId]: videos[2]},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });

    it('remove from favourites', () => {
      expect(reducer({
        items: [],
        favourites: {
          selected: [videos[0].id.videoId, videos[2].id.videoId],
          items: {[videos[0].id.videoId]: videos[0], [videos[2].id.videoId]: videos[2]},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      }, actions.ToggleFavourites({item: videos[2]}))).toEqual({
        items: [],
        favourites: {
          selected: [videos[0].id.videoId],
          items: {[videos[0].id.videoId]: videos[0]},
        },
        loading: true,
        navigation: {
          nextPage: null,
          query: null,
          limit: 50,
        },
      });
    });
  });

});
