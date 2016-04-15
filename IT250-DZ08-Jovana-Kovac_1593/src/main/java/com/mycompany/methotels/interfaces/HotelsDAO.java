/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.interfaces;

import com.mycompany.methotels.entities.Hoteli;
import com.mycompany.methotels.entities.Rezervacija;
import com.mycompany.methotels.entities.Sobe;
import java.util.List;

/**
 *
 * @author Jovana Kovac
 */
public interface HotelsDAO {

    public List<Sobe> getListaSvihSoba();

    public void dodajSobu(Sobe sobe);
    
    public List<Hoteli> getListaSvihHotela();
    
    public Hoteli getHotelIme(String ime);
}
