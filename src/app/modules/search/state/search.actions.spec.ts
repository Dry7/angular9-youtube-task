import * as actions from './search.actions';
import videos from '../../../tests/fixtures/videos';
import response from '../../../tests/fixtures/response';

describe('SearchActions', () => {

  it('SearchVideos', () => {
    expect(actions.SearchVideos()).toEqual({type: '[Search] Start loading videos'});
  });

  describe('SearchVideosLoading', () => {
    it('without nextPage', () => {
      expect(actions.SearchVideosLoading({query: '', limit: 30})).toEqual({
        type: '[Search] Loading videos',
        query: '',
        limit: 30,
      });
    });

    it('with query', () => {
      expect(actions.SearchVideosLoading({query: 'test', limit: 30})).toEqual({
        type: '[Search] Loading videos',
        query: 'test',
        limit: 30,
      });
    });

    it('with nextPage', () => {
      expect(actions.SearchVideosLoading({query: '', limit: 50, nextPage: 'CBQQAA'})).toEqual({
        type: '[Search] Loading videos',
        query: '',
        limit: 50,
        nextPage: 'CBQQAA'
      });
    });
  });

  it('SearchVideosComplete', () => {
    expect(actions.SearchVideosComplete({response})).toEqual({
      type: '[Search] Loading videos complete',
      response,
    });
  });

  it('SearchVideosCompleteLastPage', () => {
    expect(actions.SearchVideosCompleteLastPage()).toEqual({type: '[Search] Loading videos complete last page'});
  });

  it('SearchVideosFailed', () => {
    const error = new Error();
    expect(actions.SearchVideosFailed({error})).toEqual({type: '[Search] Loading videos failed', error});
  });

  it('SearchVideosNextPage', () => {
    expect(actions.SearchVideosNextPage()).toEqual({type: '[Search] Loading videos next page'});
  });

  it('ToggleFavourites', () => {
    expect(actions.ToggleFavourites({item: videos[0]})).toEqual({
      type: '[Search] Toggle favourites',
      item: videos[0],
    });
  });

  describe('UpdateQuery', () => {
    it('with null', () => {
      expect(actions.UpdateQuery({query: null})).toEqual({
        type: '[Search] Update query',
        query: null,
      });
    });

    it('with empty string', () => {
      expect(actions.UpdateQuery({query: ''})).toEqual({
        type: '[Search] Update query',
        query: '',
      });
    });

    it('with string', () => {
      expect(actions.UpdateQuery({query: 'мясо'})).toEqual({
        type: '[Search] Update query',
        query: 'мясо',
      });
    });
  });
});
