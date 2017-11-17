import test from 'ava'
import _ from 'lodash'
import geocode, {mapzen, nominatim, geocodio} from '../../src'

test('should work with mapzen', async t => {
  const address = 'NY 10021'
  const coordinates = await geocode(address, mapzen)
  t.is(coordinates.length, 2)
  t.deepEqual(round(coordinates), [-74.0, 40.8])
})

test('should work with nominatim', async t => {
  const address = '10021'
  const coordinates = await geocode(address, nominatim)
  t.is(coordinates.length, 2)
  t.deepEqual(round(coordinates), [-74.0, 40.8])
})

test('should work with geocodio', async t => {
  const address = '10021'
  const coordinates = await geocode(address, geocodio)
  t.is(coordinates.length, 2)
  t.deepEqual(round(coordinates), [-74.0, 40.8])
})

test('should work with geocodio multi', async t => {
  const addresses = ['10021', '06067']
  const coordinates = await geocode(addresses, geocodio)
  t.is(coordinates.length, 2)
  const first = coordinates[0]
  t.is(first.length, 2)
  t.deepEqual(round(first), [-74.0, 40.8])
  const second = coordinates[1]
  t.is(second.length, 2)
  t.deepEqual(round(second), [-72.7, 41.7])
})

test('should fail gracefully with mapzen', async t => {
  const address = 'nowheresville, 10101'
  const coordinates = await geocode(address, mapzen)
  t.falsy(coordinates)
})

test('should fail gracefully with nominatim', async t => {
  const address = 'M.SHAREEFF.NEUROLOGY,P.C. HUNTINGTON,, NY 11743'
  const coordinates = await geocode(address, nominatim)
  t.falsy(coordinates)
})

function round(array) {
  return _.map(array, elt => _.round(elt, 1))
}
