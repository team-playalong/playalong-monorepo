import { Selector } from 'testcafe'

/* eslint-disable */
fixture `Chord Search Page` 
    .page `https://www.playalong.io`;
/* eslint-enable */

test('Chord search', async t => {
  await t
      .typeText('[name="searchInput"]', 'Mark Ronson')
      .click('[name="chordSearchForm"] button')

      // Use the assertion to check if the actual header text is equal to the expected one
      .expect(Selector('ply-chord-result-list h4').innerText).eql('Mark Ronson')
})
