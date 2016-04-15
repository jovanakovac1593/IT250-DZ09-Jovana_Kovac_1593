/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.interfaces;

import com.mycompany.methotels.entities.Admin;

/**
 *
 * @author Jovana Kovac
 */
public interface AdminDAO {

    public Admin checkAdmin(String username, String password);

    public Admin registerAdmin(Admin user);

    public boolean checkIfUsernameExists(String username);

}
