import sys,subprocess,json,numpy as np
sys.path.insert(0,__import__('os').path.dirname(__import__('os').path.abspath(__file__)));import ascii2 as A2
from PIL import Image,ImageDraw,ImageFont
RAMP=" .'`^,:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
CW,CH=6,11
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf',11)
atlas=[]
for c in RAMP:
  im=Image.new('L',(CW,CH),0);ImageDraw.Draw(im).text((CW/2,CH/2),c,font=f,fill=255,anchor='mm')
  atlas.append(np.asarray(im,np.float32)/255)
atlas=np.stack(atlas)  # n,CH,CW
def probe(p):
  o=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate','-of','json',p]))['streams'][0]
  return o['width'],o['height'],o['r_frame_rate']
def frame(rgb,cols,rows):
  s=np.asarray(Image.fromarray(rgb).resize((cols,rows),Image.BOX)).astype(np.float32)
  lum=(0.2126*s[...,0]+0.7152*s[...,1]+0.0722*s[...,2])/255
  idx=np.clip((lum*(len(RAMP)-1)).round().astype(int),0,len(RAMP)-1)
  mx=np.maximum(s.max(-1,keepdims=True),1);v=255*(0.35+0.65*np.sqrt(lum))[...,None]
  fg=s/mx*v; bg=s*0.42
  m=atlas[idx]                      # rows,cols,CH,CW
  m=m.transpose(0,2,1,3)[...,None]  # rows,CH,cols,CW,1
  out=bg[:,None,:,None,:]*(1-m)+fg[:,None,:,None,:]*m
  return np.clip(out.reshape(rows*CH,cols*CW,3),0,255).astype(np.uint8)
def conv(src,dst):
  w,h,fr=probe(src)
  W,H=w,h
  dec=subprocess.Popen(['ffmpeg','-v','error','-i',src,'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE,stdin=subprocess.DEVNULL)
  enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',fr,'-i','-','-i',src,
    '-map','0:v','-map','1:a?','-c:v','libx264','-preset','veryfast','-crf','24','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart','-shortest',dst],stdin=subprocess.PIPE)
  n=w*h*3
  while True:
    b=dec.stdout.read(n)
    if len(b)<n:break
    enc.stdin.write(np.asarray(A2.fit(Image.fromarray(np.frombuffer(b,np.uint8).reshape(h,w,3)))[0].convert('RGB')).tobytes())
  enc.stdin.close();enc.wait();dec.wait()
if __name__=='__main__':
  conv(sys.argv[1],sys.argv[2])
