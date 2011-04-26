import java.applet.*;
import javax.sound.midi.*;
//import java.awt.*;

public class testappletplayer extends Applet {
	Sequencer seq;
	
	public void init() {
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
		
		seq.start();
		
		
		
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
}
