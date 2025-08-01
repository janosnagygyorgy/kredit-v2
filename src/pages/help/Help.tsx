import "./Help.css";

function Help() {
  return (
    <>
      <h1>Súgó</h1>
      <h2>Féléves statisztikák</h2>
      <h3>Hagyományos átlag</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <ms>érdemjegy</ms>
            </mrow>
          </mrow>
          <mrow>
            <ms>tárgyak_darabszáma</ms>
          </mrow>
        </mfrac>
      </math>

      <h3>Súlyozott átlag</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>teljesített_kredit</ms>
                <mo>*</mo>
                <ms>érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <ms>teljesített_kredit</ms>
            </mrow>
          </mrow>
        </mfrac>
      </math>

      <h3>Felvett kredit</h3>
      <p>A félévben felvett tárgy kreditjeinek összege.</p>

      <h3>Teljesített kredit</h3>
      <p>
        A félévben felvett, nem elégtelen értékelésű tárgy kreditjeinek összege.
      </p>

      <h3>Kreditindex</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>teljesített_kredit</ms>
                <mo>*</mo>
                <ms>érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <mn>30</mn>
          </mrow>
        </mfrac>
      </math>

      <h3>Korrigált kreditindex</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>teljesített_kredit</ms>
                <mo>*</mo>
                <ms>érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <mn>30</mn>
          </mrow>
        </mfrac>
        <mo>*</mo>
        <mfrac>
          <mrow>
            <ms>teljesített_kredit</ms>
          </mrow>
          <mrow>
            <ms>felvett_kredit</ms>
          </mrow>
        </mfrac>
      </math>

      <h2>Összesített (halmozott) statisztikák</h2>
      <h3>Összesített hagyományos átlag</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <ms>összes_érdemjegy</ms>
            </mrow>
          </mrow>
          <mrow>
            <ms>összes_tárgy_darabszáma</ms>
          </mrow>
        </mfrac>
      </math>

      <h3>Összesített súlyozott átlag</h3>
      <p>Neptunban "Halmozott átlag"</p>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>összes_teljesített_kredit</ms>
                <mo>*</mo>
                <ms>összes_érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <ms>összes_teljesített_kredit</ms>
            </mrow>
          </mrow>
        </mfrac>
      </math>

      <h3>Összesített kreditindex</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>összes_teljesített_kredit</ms>
                <mo>*</mo>
                <ms>összes_érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <ms>aktív_félévek_száma</ms>
            <mo>*</mo>
            <mn>30</mn>
          </mrow>
        </mfrac>
      </math>

      <h3>Összesített korrigált kreditindex</h3>
      <math>
        <mfrac>
          <mrow>
            <mo>&sum;</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <ms>összes_teljesített_kredit</ms>
                <mo>*</mo>
                <ms>összes_érdemjegy</ms>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mrow>
          <mrow>
            <ms>aktív_félévek_száma</ms>
            <mo>*</mo>
            <mn>30</mn>
          </mrow>
        </mfrac>
        <mo>*</mo>
        <mfrac>
          <mrow>
            <ms>összes_teljesített_kredit</ms>
          </mrow>
          <mrow>
            <ms>összes_felvett_kredit</ms>
          </mrow>
        </mfrac>
      </math>

      <h3>Összes teljesített kredit</h3>
      <p>A félévek során felvett összes tárgy kreditjeinek összege.</p>
    </>
  );
}

export default Help;
