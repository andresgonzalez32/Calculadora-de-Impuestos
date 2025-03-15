package com.taxcalculator;

import javax.swing.SwingUtilities;
import com.taxcalculator.views.MainFrame;

public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            MainFrame mainFrame = new MainFrame();
            mainFrame.setVisible(true);
        });
    }
}