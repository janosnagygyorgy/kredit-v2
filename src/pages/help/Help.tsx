import "./Help.css";
import Tex2SVG from "react-hook-mathjax";

function Help() {
  return (
    <>
      <h1>Súgó</h1>
      <h2>Féléves statisztikák</h2>
      <h3>Hagyományos átlag</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{érdemjegy}}{\text{tárgyak_darabszáma}}"
        />
      </p>

      <h3>Súlyozott átlag</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(teljesített_kredit} \cdot \text{érdemjegy)}}{\sum \text{teljesített_kredit}}"
        />
      </p>

      <h3>Felvett kredit</h3>
      <p>A félévben felvett tárgy kreditjeinek összege.</p>

      <h3>Teljesített kredit</h3>
      <p>
        A félévben felvett, nem elégtelen értékelésű tárgy kreditjeinek összege.
      </p>

      <h3>Kreditindex</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(teljesített_kredit} \cdot \text{érdemjegy)}}{30}"
        />
      </p>

      <h3>Korrigált kreditindex</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(teljesített_kredit} \cdot \text{érdemjegy)}}{30} \cdot \frac{\text{teljesített_kredit}}{\text{felvett_kredit}}"
        />
      </p>

      <h2>Összesített (halmozott) statisztikák</h2>
      <h3>Összesített hagyományos átlag</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{összes_érdemjegy}}{\text{összes_tárgy_darabszáma}}"
        />
      </p>

      <h3>Összesített súlyozott átlag</h3>
      <p>Neptunban "Halmozott átlag"</p>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(összes_teljesített_kredit} \cdot \text{összes_érdemjegy)}}{\sum \text{összes_teljesített_kredit}}"
        />
      </p>

      <h3>Összesített kreditindex</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(összes_teljesített_kredit} \cdot \text{összes_érdemjegy})}{\text{aktív_félévek_száma} \cdot 30}"
        />
      </p>

      <h3>Összesített korrigált kreditindex</h3>
      <p>
        <Tex2SVG
          display="inline"
          latex="\frac{\sum \text{(összes_teljesített_kredit} \cdot \text{összes_érdemjegy})}{\text{aktív_félévek_száma} \cdot 30} \cdot \frac{\text{összes_teljesített_kredit}}{\text{összes_felvett_kredit}}"
        />
      </p>

      <h3>Összes teljesített kredit</h3>
      <p>A félévek során felvett összes tárgy kreditjeinek összege.</p>
    </>
  );
}

export default Help;
