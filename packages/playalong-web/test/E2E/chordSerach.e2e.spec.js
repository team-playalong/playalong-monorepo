'use strict';

function ChordSearchPage() {

  this.get = function() {
    browser.get('https://www.playalong.io/');
  };

  this.doSearch = function(searchInput) {
    browser.findElement(by.name('searchInput')).sendKeys(searchInput);
    browser.findElement(by.id('plySearchButton')).click();
    browser.driver.sleep(3000);
  };
}


xdescribe('chord search', function() {
  var chordSearchPage = new ChordSearchPage();

  beforeEach(chordSearchPage.get);

	it('should show the results for the given chord search', function() {
    expect(browser.getTitle()).toEqual('Playaln');
	});
});
