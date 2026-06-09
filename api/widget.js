export default async function handler(req, res) {
  const agency = req.query.agency || 'Sowper';
  const mode = req.query.mode || '';
  const t = Date.now();

  const params = new URLSearchParams({ agency, raw: '1', t: t.toString() });
  if (mode) params.set('mode', mode);

  const url = 'https://script.google.com/macros/s/AKfycbxAJ0zDDLsDhJNo--loxNT_KLkloTgDbdwi8cQHtrAScEv8ffenL8txr4S9IazN4kDf/exec?' + params.toString();

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send('Error loading widget');
  }
}
