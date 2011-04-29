import java.applet.*;
import java.awt.Button;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.sound.midi.*;
//import java.awt.*;

public class testappletplayer extends Applet implements ActionListener {
	Sequencer seq;
	Button playBtn;
	Button stopBtn;
	
	public void init() {
		playBtn = new Button("play");
		stopBtn = new Button("stop"); 
		
		try {
			loadMidiSystem();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			seq.setSequence(generateFibSeq());
		} catch (InvalidMidiDataException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		// put a button for UI
		playBtn.setBounds(10, 10, 30, 30);
		playBtn.setBounds(40, 10, 30, 30);
		
		add(playBtn);
		add(stopBtn);
		
		playBtn.addActionListener(this);
		stopBtn.addActionListener(this);
		setSize(800,50);
		
		
	}
	
	public void stop() {
		seq.stop();
	}
	
	private void loadMidiSystem() throws Exception {
		seq = MidiSystem.getSequencer();
		if (seq == null) {
			// Error -- sequencer device is not supported.
		    // Inform user and return...
		    throw new Exception("Sequencer device not supported.");
		} else {
		    // Acquire resources and make operational.
		    seq.open();
		}
	}
	
	private Sequence generateFibSeq() throws InvalidMidiDataException {
		Sequence s = null;
		s = new Sequence(Sequence.SMPTE_30, 10);
		s.createTrack();
		Track[] t = s.getTracks();
		//byte[] mdata = {(byte) ShortMessage.NOTE_ON, (byte) 80, (byte) 20};
		
		int[] fib = new int[40];
		fib[0] = 1;
		fib[1] = 1;
		for (int i = 2; i < 40; i++) {
			fib[i] = fib[i-2] + fib[i-1];
		}
		
		for (int i = 0; i < 40; i++) {
			ShortMessage m = new ShortMessage();
			m.setMessage(ShortMessage.NOTE_ON, 2, fib[i] % 128, 100);
			t[0].add(new MidiEvent(m, i*80));
			ShortMessage m2 = new ShortMessage();
			m2.setMessage(ShortMessage.NOTE_OFF, 2, fib[i] % 128, 100);
			t[0].add(new MidiEvent(m2, i*80+79));
		}
		
		return s;
		
	}

	public void actionPerformed(ActionEvent event) {
		if (event.getSource() == playBtn) {
			seq.start();
		}
		if (event.getSource() == stopBtn) {
			seq.stop();
		}
	}
	
	public void paint(Graphics g){
		//show a text
		g.setColor(Color.black);
		g.drawString("This is the JAVA Midi Player", 100, 20);
		
	}
	
}
