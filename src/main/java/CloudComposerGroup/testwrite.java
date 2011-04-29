// Cloud Composer: testwrite.java
// James Vaughan
// Apologies for the bad name.  This file is the test file for generating
// and playing a MIDI sequence.  Currently, it generates the first 40
// Fibonacci sequence numbers and then plays them as though they were
// the pitch of the instrument (mod 128).

// We will probably want to make this more modular so it can interact
// with the webpage and not simply play once it is loaded.

import java.io.File;
import java.io.IOException;

import javax.sound.midi.*;

public class testwrite {
	public static void main(String[] args) 
	throws InvalidMidiDataException, MidiUnavailableException, IOException {
		Sequence s = new Sequence(Sequence.SMPTE_30, 10);
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
		
		Sequencer seq;
		// Get default sequencer.
		seq = MidiSystem.getSequencer(); 
		if (seq == null) {
		    // Error -- sequencer device is not supported.
		    // Inform user and return...
		} else {
		    // Acquire resources and make operational.
		    seq.open();
		}
		
		seq.setSequence(s);
		
		seq.start();
		
		
		// This is some basic code for writing to one's computer.
		/*File f = new File("/Users/crombrodin/fib.midi");
		MidiSystem.write(seq.getSequence(), 1, f);
		System.out.println("Done");*/
	}
	
}
